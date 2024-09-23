import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearMessages } from '../../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, error, status } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  // Giriş başarılı olursa yönlendirme yap
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
      toast.success('Giriş başarılı!');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Giriş Yap</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>Kullanıcı Adı</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Kullanıcı adınızı giriniz"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mt-3">
                  <Form.Label>Şifre</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Şifrenizi giriniz"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="mt-4 w-100"
                  variant="primary"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? <Spinner animation="border" size="sm" /> : 'Giriş Yap'}
                </Button>

                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
              </Form>
              <div className="text-center mt-3">
                <Link to="/register">Hesabınız yok mu? Kayıt olun</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer autoClose={3000} hideProgressBar />
    </Container>
  );
};

export default LoginPage;
