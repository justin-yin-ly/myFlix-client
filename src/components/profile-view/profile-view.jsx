import { useEffect, useState } from "react";
import { MovieCard } from '../movie-card/movie-card';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';

export const ProfileView = ({user, token, setUser, movies}) => {
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.email);
    const [birthday, setBirthday] = useState(user.birthday);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    
    const favoriteMovies = movies.filter((movie) => user.favoriteMovies.includes(movie.id));

    const toggleShowUpdate = () => setShowUpdate(!showUpdate);
    const toggleShowDelete = () => setShowDelete(!showDelete);
  
    const updateUser = (event) => {
      event.preventDefault();
  
      const data = {
          username: username,
          email: email,
          birthday: birthday
      };

      if(password) {
        data['password'] = password;
      }
  
      fetch("https://cinedata-05d7865bba09.herokuapp.com/users/" + user.username, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
              "Content-Type": "application/json", 
              Authorization: `Bearer ${token}`
          }
      }).then((response) => {
          if (response.ok) {
              alert("Update successful");
              window.location.reload();
          } else {
              alert("Update failed");
          }
      }).then((data) => {
        if(data) {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("token", data.token);
        }
      });
    };

    const deleteUser = (event) => {
        event.preventDefault();

        fetch("https://cinedata-05d7865bba09.herokuapp.com/users/" + user.username, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
            if(response.ok) {
                alert("Your account has been deleted.");
                window.location.reload();
            } else {
                alert("Something went wrong with deleting your account.");
            }
        })
    }

    return (<>
        <Row>
            <Card className='h-100 mb-3'>
                <Card.Body>
                    <Card.Text>Username: {user.username}</Card.Text>
                    <Card.Text>Email: {user.email}</Card.Text>
                    <Card.Text>Birthday: {user.birthday}</Card.Text>
                    <Button onClick={toggleShowUpdate}>Update My Info</Button>
                    <Card.Text></Card.Text>
                    <Button onClick={toggleShowDelete}>Delete My Account</Button>
                    
                </Card.Body>
            </Card>
        </Row>
        <Row>
            <h3>Favorite Movies</h3>
            <>
                {
                    favoriteMovies.length === 0 ? 
                    (
                        <Col>This list is empty!</Col>
                    ) : 
                    (
                        <>
                            {favoriteMovies.map((movie) => (
                                <Col>
                                    <MovieCard movie={movie}></MovieCard>
                                </Col>
                            ))}
                        </>
                    )
                }
            </>
        </Row>
        <Modal show={showUpdate}>
            <Modal.Header>
                Update My Info
            </Modal.Header>
            <Modal.Body>
            <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
    </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={toggleShowUpdate}>Cancel</Button>
                <Button onClick={updateUser}>Confirm Update</Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showDelete}>
            <Modal.Header>
                Hold on There!
            </Modal.Header>
            <Modal.Body>
                Do you really want to PERMANENTLY delete your account?
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={toggleShowDelete}>Cancel</Button>
                <Button onClick={deleteUser}>Confirm Deletion</Button>
            </Modal.Footer>
        </Modal>
    </>)
}