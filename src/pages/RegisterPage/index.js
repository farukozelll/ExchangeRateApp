import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearMessages } from '../../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, error, status } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  // Kayıt başarılı olursa giriş sayfasına yönlendirme yap
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/login');
      toast.success('Kayıt başarılı! Lütfen giriş yapınız.');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Şifreler uyuşmuyor');
      return;
    }
    dispatch(register(formData));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Register</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                <Form.Label>Kullanıcı Adı</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    placeholder="Kullanıcı adınızı giriniz"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="email" className="mt-3">
                <Form.Label>E-posta</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="E-posta adresinizi giriniz"
                    value={formData.email}
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
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="mt-3">
                <Form.Label>Şifreyi Onaylayın</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Şifrenizi tekrar giriniz"
                    value={formData.confirmPassword}
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
                  {status === 'loading' ? <Spinner animation="border" size="sm" /> : 'Kayıt Ol'}
                </Button>

                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
              </Form>
              <div className="text-center mt-3">
                <Link to="/login">Zaten hesabınız var mı? Giriş yapıny</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer autoClose={3000} hideProgressBar />
    </Container>
  );
};

export default RegisterPage;
