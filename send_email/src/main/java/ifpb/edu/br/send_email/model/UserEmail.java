package ifpb.edu.br.send_email.model;

public class UserEmail {
    String username;
    String email;

    public UserEmail() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "User [username=" + username + ", email=" + email + "]";
    }
}
