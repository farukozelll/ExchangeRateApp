import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { ProfileContainer, ProfileCard, ProfileTitle, SectionTitle, InlineFormGroup } from './index.style';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfileThunk, clearMessages } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, successMessage, error, loading } = useSelector((state) => state.auth);
    const [profileData, setProfileData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        birthDate: user?.birthDate || '',
    });
    const [passwordData, setPasswordData] = useState({
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        if (loading) {
            toast.info("Değişiklikler kaydediliyor...");
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch(clearMessages());
        }
        if (error) {
            toast.error(error);
            dispatch(clearMessages());
        }
    }, [successMessage, error, loading, dispatch, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password' || name === 'confirmPassword') {
            setPasswordData({ ...passwordData, [name]: value });
        } else {
            setProfileData({ ...profileData, [name]: value });
        }
    };

    const hasChanges = () => {
        return Object.keys(profileData).some(key => profileData[key] !== user[key]) ||
            (passwordData.password || passwordData.confirmPassword);
    };

       // Form gönderildiğinde kullanıcı profilini günceller
       const handleSubmit = (e) => {
        e.preventDefault(); // Formun sayfayı yenilemesini engeller
        if (!hasChanges()) {
            toast.info("Herhangi bir değişiklik yapılmadı.");
            return;
        }
        if (passwordData.password !== passwordData.confirmPassword) { // Şifrelerin eşleşip eşleşmediğini kontrol eder
            toast.error("Şifreler uyuşmuyor.");
            return;
        }
        dispatch(updateUserProfileThunk({ ...profileData, ...passwordData })); // Profil ve şifre güncelleme işlemi
    };

    const handleCancel = () => {
        navigate('/'); // Vazgeç butonuna basıldığında ana sayfaya yönlendir
    };

    return (
        <ProfileContainer>
            <ProfileCard>
                <Container>
                    <ProfileTitle>Profil Ayarları</ProfileTitle> {/* Sayfa Başlığı */}
                    <Form onSubmit={handleSubmit}>
                        {/* Kişisel Bilgiler Bölümü */}
                        <SectionTitle>
                            Kişisel Bilgiler: <span className="username">{user?.username}</span>
                        </SectionTitle>
                        <Row>
                            <Col md={4}>
                                <Form.Group controlId="formFirstName">
                                    <Form.Label>Ad</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={profileData.firstName}
                                        onChange={handleChange}
                                        placeholder="Adınızı giriniz"
                                        isInvalid={profileData.firstName.trim() === ""}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Lütfen bir ad giriniz.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group controlId="formLastName">
                                    <Form.Label>Soyad</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={profileData.lastName}
                                        onChange={handleChange}
                                        placeholder="Soyadınızı giriniz"
                                        isInvalid={profileData.lastName.trim() === ""}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Lütfen bir soyad giriniz.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>E-posta</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleChange}
                                        placeholder="E-posta adresinizi giriniz"
                                        isInvalid={!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(profileData.email)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Lütfen geçerli bir e-posta adresi giriniz.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={4}>
                                <Form.Group controlId="formPhone">
                                    <Form.Label>Telefon</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleChange}
                                        placeholder="Telefon numaranızı giriniz"
                                        isInvalid={!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(profileData.phone)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Lütfen geçerli bir telefon numarası giriniz.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group controlId="formAddress">
                                    <Form.Label>Adres</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={profileData.address}
                                        onChange={handleChange}
                                        placeholder="Adresinizi giriniz"
                                        isInvalid={profileData.address.trim() === ""}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Lütfen bir adres giriniz.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group controlId="formBirthDate">
                                    <Form.Label>Doğum Tarihi</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="birthDate"
                                        value={profileData.birthDate}
                                        onChange={handleChange}
                                        isInvalid={profileData.birthDate === ""}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Lütfen doğum tarihinizi giriniz.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Şifre Değiştirme Bölümü */}
                        <SectionTitle>Şifre Değiştir</SectionTitle>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Yeni Şifre</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={passwordData.password}
                                        onChange={handleChange}
                                        placeholder="Yeni şifre giriniz"
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group controlId="formConfirmPassword">
                                    <Form.Label>Yeni Şifreyi Onaylayın</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Yeni şifreyi tekrar giriniz"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col md={6}>
                                <Button variant="secondary" onClick={handleCancel}>
                                    Vazgeç
                                </Button>
                            </Col>
                            <Col md={6} className="text-right">
                                <Button variant="primary" type="submit">
                                    Değişiklikleri Kaydet
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <ToastContainer autoClose={3000} hideProgressBar position="top-right" /> {/* Toastify Bildirim Kapsayıcısı */}
                </Container>
            </ProfileCard>
        </ProfileContainer>
    );
};

export default ProfilePage;
