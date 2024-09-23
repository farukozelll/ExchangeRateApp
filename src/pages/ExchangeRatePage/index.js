import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllExchangeRates, fetchLatestExchangeRate } from '../../store/exchangeRateSlice';
import { Line } from 'react-chartjs-2';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SpinnerWrapper, Spinner } from './index.style';

// Chart.js bileşenleri ve ölçeklerini kaydedin
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ExchangeRate = () => {
  const dispatch = useDispatch();
  const { data, average, loading, error } = useSelector((state) => state.exchangeRate);

  useEffect(() => {
    // Veriyi 10 saniyede bir güncellemek için setInterval kullanıyoruz.
    dispatch(fetchAllExchangeRates());
    dispatch(fetchLatestExchangeRate());

    const intervalId = setInterval(() => {
      dispatch(fetchAllExchangeRates());
      dispatch(fetchLatestExchangeRate());
    }, 10000); // 10 saniye aralıklarla verileri çek

    return () => clearInterval(intervalId); // Bileşen unmount olduğunda interval'ı temizle
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error('Veri çekme hatası: ' + error);
    }
  }, [error]);

  const chartData = {
    labels: data.timestamps, // Zaman damgaları
    datasets: [
      {
        label: 'USD/TRY Price (Last 7 Days)',
        data: data.prices, // Fiyat verileri
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { enabled: true },
      title: { display: true, text: `USD/TRY Price Movement (7 Days)` },
    },
    scales: {
      x: { type: 'category', title: { display: true, text: 'Time' } },
      y: { title: { display: true, text: `Price (USD/TRY)` }, beginAtZero: false },
    },
  };

  // Ortalama değeri sayıya dönüştürün
  const averageValue = typeof average === 'number' ? average : parseFloat(average);

  return (
    <Container className="mt-4">
      {loading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <Row>
          <Col md={6} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>USD/TRY - Son 7 Gün</Card.Title>
                <Line data={chartData} options={chartOptions} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Son 60 Dakika Ortalaması</Card.Title>
                {/* Ortalama değeri sayıya dönüştürün ve kontrol edin */}
                <h3>{!isNaN(averageValue) ? averageValue.toFixed(6) : 'N/A'}</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <ToastContainer autoClose={3000} hideProgressBar />
    </Container>
  );
};

export default ExchangeRate;
