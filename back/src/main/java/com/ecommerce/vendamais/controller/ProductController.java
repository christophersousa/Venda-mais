package com.ecommerce.vendamais.controller;

import com.ecommerce.vendamais.common.ApiResponseProduct;
import com.ecommerce.vendamais.dto.ProductDto;
import com.ecommerce.vendamais.common.ApiResponse;
import com.ecommerce.vendamais.model.Company;
import com.ecommerce.vendamais.model.Photo;
import com.ecommerce.vendamais.model.Product;
import com.ecommerce.vendamais.model.Type;
import com.ecommerce.vendamais.repository.PhotoRepository;
import com.ecommerce.vendamais.repository.TypeRepository;
import com.ecommerce.vendamais.service.AuthenticationService;
import com.ecommerce.vendamais.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/produto")
public class ProductController {
    @Autowired
    ProductService productService;

    @Autowired
    PhotoRepository photoRepository;

    @Autowired
    TypeRepository typeRepository;

    @Autowired
    AuthenticationService authenticationService;
    @PostMapping("/create")
    public ResponseEntity<ApiResponseProduct> createProduct(@RequestBody ProductDto productDto,
                                                     @RequestParam("token") String token){
        authenticationService.authenticate(token);

        Company company = authenticationService.getCompany(token);

        Optional<Type> type = typeRepository.findById(productDto.getTipoId());
        if(!type.isPresent()){
            return new ResponseEntity<>(new ApiResponseProduct(false, "tipo do produto não existe", 0), HttpStatus.BAD_REQUEST);
        }
        Product product = productService.createProduct(productDto, type.get(), company);
        return new ResponseEntity<>(new ApiResponseProduct(true, "produto adicionado com sucesso", product.getId()), HttpStatus.CREATED);
    }

    @GetMapping("/listMyProducts")
    public ResponseEntity<List<ProductDto>> listMyProducts(@RequestParam("token") String token){
        authenticationService.authenticate(token);

        Company company = authenticationService.getCompany(token);
        System.out.println("*********** produtos *******" + company);
        List<ProductDto> products = productService.getAllProductsByCompany(company);
        System.out.println("*********** produtos *******" + products);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<ProductDto>> getProducts(){
        List<ProductDto> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{productId}")
    public ProductDto getProductById(@PathVariable("productId") int productId){
        return productService.getProductDtoById(productId);

    }

    @GetMapping("/list/type/{typeId}")
    public List<ProductDto> getAllProductsByTypeId(@PathVariable("typeId") int typeId){
        return productService.getAllProductsByTypeId(typeId);

    }

    @PostMapping("/{productId}/uploadPhoto")
    public ResponseEntity<ApiResponse> uploadPhoto(@RequestParam MultipartFile photo, @PathVariable("productId") int productId) throws Exception {
        System.out.println("id do produto " + productId);
        if(!productService.findById(productId)){
            return new ResponseEntity<>(new ApiResponse(false, "produto não existe"), HttpStatus.NOT_FOUND);
        }
        productService.savePhoto(photo, productId);
        return new ResponseEntity<>(new ApiResponse(true, "foto do produto salva com sucesso"), HttpStatus.OK);
    }

    @GetMapping("/{productId}/downloadPhoto")
    public @NotNull byte[] getProductPhotoById(@PathVariable("productId") int productId){
        return productService.getProductPhotoById(productId);
    }

    @GetMapping("/getProductPhotos")
    public @NotNull List<Photo> getProductPhotos(){
        return productService.getProductPhotos();
    }


    @PostMapping("/update/{productId}")
    public ResponseEntity<ApiResponse> updateProduct(@PathVariable("productId") int productId, @RequestBody ProductDto productDto) throws Exception {
        Optional<Type> type = typeRepository.findById(productDto.getTipoId());
        if(!type.isPresent()){
            return new ResponseEntity<>(new ApiResponse(false, "tipo do produto não existe"), HttpStatus.NOT_FOUND);
        }

        productService.updateProduct(productDto, productId);
        return new ResponseEntity<>(new ApiResponse(true, "produto editado com sucesso"), HttpStatus.OK);
    }
    @Transactional
    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable("productId") int productId){
        if(!productService.findById(productId)){
            return new ResponseEntity<>(new ApiResponse(false, "produto não existe"), HttpStatus.NOT_FOUND);
        }

        photoRepository.deleteByProduct_Id(productId);
        productService.deleteProduct(productId);
        return new ResponseEntity<>(new ApiResponse(true, "produto removido com sucesso"), HttpStatus.OK);
    }
}