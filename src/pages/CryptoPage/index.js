import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCryptoData, getCryptoAverage } from '../../store/cryptoSlice';
import { Line } from 'react-chartjs-2';
import { Container, Tab, Nav, Row, Col, Card, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SpinnerWrapper, Spinner, JSONOutput } from './index.style';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CryptoPage = () => {
  const dispatch = useDispatch();
  const { data, average, apiResponse } = useSelector((state) => state.crypto);
  const [activeKey, setActiveKey] = useState('BNBBTC');
  const [spinnerVisible, setSpinnerVisible] = useState(true);
  const [selectedJSON, setSelectedJSON] = useState(null);

  const symbols = ['BNBBTC', 'ETHBTC', 'XRPBTC', 'BCHBTC', 'LTCBTC'];

  useEffect(() => {
    fetchCryptoData();

    // Spinner'ı kapat ve içerikleri göster
    const timeoutId = setTimeout(() => setSpinnerVisible(false), 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!spinnerVisible) {
      const intervalId = setInterval(fetchCryptoData, 4000);
      return () => clearInterval(intervalId);
    }
  }, [spinnerVisible]);

  const fetchCryptoData = () => {
    symbols.forEach((symbol) => {
      dispatch(getCryptoData(symbol));
      dispatch(getCryptoAverage(symbol));
    });
  };

  useEffect(() => {
    setSelectedJSON(apiResponse[activeKey]);
  }, [apiResponse, activeKey]);

  const handleShowJSON = (symbol) => {
    const selectedData = apiResponse[symbol];
    setSelectedJSON({ symbol, data: selectedData });
    toast.info(`${symbol} JSON data gösteriliyor`);
  };

  const renderTable = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return <p>Veri yok</p>;
    }

    return (
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price (BTC)</th>
            <th>Price (USDT)</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.symbol}</td>
              <td>{item.priceBtc.toFixed(8)}</td>
              <td>{item.priceUsdt.toFixed(2)}</td>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderChart = (symbol, prices, avg) => {
    const chartData = {
      labels: data.timestamps,
      datasets: [
        {
          label: `${symbol} Price (5min)`,
          data: prices,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.6)',
          borderColor: 'rgba(75,192,192,1)',
          tension: 0,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: true, position: 'top' },
        tooltip: { enabled: true },
        title: { display: true, text: `${symbol} Price Movement (5min intervals)` },
      },
      scales: {
        x: { type: 'category', title: { display: true, text: 'Time' } },
        y: { title: { display: true, text: `Price (${symbol})` }, beginAtZero: false },
      },
    };

    return (
      <Card className="mb-4">
        <Card.Body>
          {/* <div style={{ height: '400px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>*/} 
          <h3>Son 60 Dakika Ortalaması: {avg.toFixed(6)}</h3>
          <Button onClick={() => handleShowJSON(symbol)} variant="info" className="mt-3">
          JSON Verilerini Göster
          </Button>
          {/* `selectedJSON` varsa ve sembol eşleşiyorsa ekranda göster */}
          {selectedJSON && selectedJSON.data && selectedJSON.symbol === symbol && (
            <div className="mt-4">
              <Row>
                <Col md={6}>
                  {/* Tablo render fonksiyonu ile verileri tablo halinde göster */}
                  {renderTable(selectedJSON.data)}
                </Col>
                <Col md={6}>
                  {/* JSON Verisi */}
                  <JSONOutput>
                    <pre>{JSON.stringify(selectedJSON.data, null, 2)}</pre>
                  </JSONOutput>
                </Col>
              </Row>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container className="mt-4">
      {spinnerVisible ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
          <Row>
            <Col md={3}>
              <Nav variant="pills" className="flex-column">
                {symbols.map((symbol) => (
                  <Nav.Item key={symbol}>
                    <Nav.Link eventKey={symbol}>{symbol}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col md={9}>
              <Tab.Content>
                {symbols.map((symbol) => (
                  <Tab.Pane key={symbol} eventKey={symbol}>
                    {renderChart(symbol, data[`${symbol.toLowerCase()}Prices`], average[symbol.toLowerCase()])}
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
      <ToastContainer autoClose={3000} hideProgressBar />
    </Container>
  );
};

export default CryptoPage;
