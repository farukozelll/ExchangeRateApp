import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllExchangeRates, fetchLatestExchangeRate } from '../../store/exchangeRateSlice';
import { getCryptoAverage } from '../../store/cryptoSlice';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const exchangeRateData = useSelector((state) => state.exchangeRate.data);
  const exchangeRateAverage = useSelector((state) => state.exchangeRate.average);
  const cryptoAverage = useSelector((state) => state.crypto.average);
  const loading = useSelector((state) => state.exchangeRate.loading);
  const error = useSelector((state) => state.exchangeRate.error);

  useEffect(() => {
    dispatch(fetchAllExchangeRates());
    dispatch(fetchLatestExchangeRate());

    ['BNBBTC', 'ETHBTC', 'XRPBTC', 'BCHBTC', 'LTCBTC'].forEach((symbol) => {
      dispatch(getCryptoAverage(symbol));
    });
  }, [dispatch]);

  // `exchangeRateData` ve içindeki `timestamps` ve `prices` dizilerini kontrol et
  const latestSevenDaysData = {
    timestamps: exchangeRateData && exchangeRateData.timestamps ? exchangeRateData.timestamps.slice(-7) : [],
    prices: exchangeRateData && exchangeRateData.prices ? exchangeRateData.prices.slice(-7) : [],
  };

  useEffect(() => {
    // Hata mesajını kontrol et
    if (error) {
      toast.error('Veri çekme hatası: ' + error);
    }
  }, [error]);

  return (
    <Container className="mt-4">
      {loading ? (
        <div>Yükleniyor...</div> // Yüklenme durumu gösteriliyor
      ) : (
        <Row>
          <Col md={6} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Döviz Kuru - Anlık Kur</Card.Title>
                {/* Ortalama değeri kontrol edin ve null durumunda uygun bir mesaj gösterin */}
                <h3>{exchangeRateAverage !== null && !isNaN(exchangeRateAverage) ? exchangeRateAverage.toFixed(6) : 'Veri yok'}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Kripto Paralar - Son 60 Dakika Ortalamaları</Card.Title>
                <ul>
                  {cryptoAverage && Object.keys(cryptoAverage).length > 0 ? (
                    Object.keys(cryptoAverage).map((symbol) => (
                      <li key={symbol}>
                        {symbol}: {cryptoAverage[symbol] ? cryptoAverage[symbol].toFixed(6) : 'N/A'}
                      </li>
                    ))
                  ) : (
                    <li>Veri yok</li>
                  )}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <Row>
        <Col md={12} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>USD/TRY Döviz Kuru - Son 7 Gün</Card.Title>
              {/* Eğer veriler yoksa uyarı mesajı göster */}
              {latestSevenDaysData.timestamps.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Tarih</th>
                      <th>Fiyat (USD/TRY)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestSevenDaysData.timestamps.map((timestamp, index) => (
                      <tr key={index}>
                        <td>{new Date(timestamp).toLocaleDateString()}</td>
                        <td>{latestSevenDaysData.prices[index].toFixed(6)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div>Veri yok</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer autoClose={3000} hideProgressBar />
    </Container>
  );
};

export default HomePage;
