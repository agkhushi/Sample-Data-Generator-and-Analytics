import React, { useState, useEffect, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingCart,
  Download,
  Filter,
  RefreshCw,
  BarChart3
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DataPoint {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
}

const EnhancedAnalytics: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('food-delivery');
  const [timeRange, setTimeRange] = useState('30');
  const [isLoading, setIsLoading] = useState(false);

  // Sample data for demonstration
  const generateSampleData = useCallback((): DataPoint[] => {
    const data: DataPoint[] = [];
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - parseInt(timeRange) * 24 * 60 * 60 * 1000);
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      data.push({
        date: d.toISOString().split('T')[0],
        revenue: Math.floor(Math.random() * 50000) + 10000,
        orders: Math.floor(Math.random() * 200) + 50,
        customers: Math.floor(Math.random() * 100) + 20,
      });
    }
    return data;
  }, [timeRange]);

  const [chartData, setChartData] = useState<DataPoint[]>(generateSampleData());

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setChartData(generateSampleData());
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setChartData(generateSampleData());
  }, [generateSampleData, selectedCategory]);

  const lineChartData = {
    labels: chartData.map(d => d.date),
    datasets: [
      {
        label: 'Revenue (₹)',
        data: chartData.map(d => d.revenue),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Orders',
        data: chartData.map(d => d.orders),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ['Food Delivery', 'Clothing', 'Electronics', 'Books', 'Automotive', 'Healthcare'],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: [450000, 320000, 280000, 180000, 1200000, 350000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
      },
    ],
  };

  const doughnutData = {
    labels: ['Food Delivery', 'Clothing', 'Electronics', 'Books', 'Automotive', 'Healthcare'],
    datasets: [
      {
        data: [35, 25, 20, 10, 8, 2],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const totalRevenue = chartData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = chartData.reduce((sum, d) => sum + d.orders, 0);
  const totalCustomers = chartData.reduce((sum, d) => sum + d.customers, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  return (
    <div className="enhanced-analytics">
      <div className="analytics-header">
        <h1>📊 Enhanced Multi-Category Analytics Dashboard</h1>
        <p>Real-time insights and advanced data visualization</p>
      </div>

      <div className="controls-panel">
        <div className="control-group">
          <label>Category:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="food-delivery">🍕 Food Delivery</option>
            <option value="clothing">👕 Clothing & Fashion</option>
            <option value="electronics">📱 Electronics</option>
            <option value="books">📚 Books & Literature</option>
            <option value="automotive">🚗 Automotive</option>
            <option value="healthcare">🏥 Healthcare</option>
          </select>
        </div>

        <div className="control-group">
          <label>Time Range:</label>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 3 Months</option>
            <option value="365">Last Year</option>
          </select>
        </div>

        <button 
          className="refresh-btn"
          onClick={refreshData}
          disabled={isLoading}
        >
          <RefreshCw className={isLoading ? 'spinning' : ''} />
          {isLoading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign />
          </div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <p className="stat-value">₹{totalRevenue.toLocaleString()}</p>
            <span className="stat-change positive">+12.5%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <ShoppingCart />
          </div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <p className="stat-value">{totalOrders.toLocaleString()}</p>
            <span className="stat-change positive">+8.3%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Users />
          </div>
          <div className="stat-content">
            <h3>Active Customers</h3>
            <p className="stat-value">{totalCustomers.toLocaleString()}</p>
            <span className="stat-change positive">+15.2%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp />
          </div>
          <div className="stat-content">
            <h3>Avg Order Value</h3>
            <p className="stat-value">₹{avgOrderValue.toFixed(2)}</p>
            <span className="stat-change positive">+5.7%</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Revenue & Orders Trend</h3>
          <Line 
            data={lineChartData} 
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' as const },
                title: { display: false },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>

        <div className="chart-container">
          <h3>Category Revenue Comparison</h3>
          <Bar 
            data={barChartData} 
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' as const },
                title: { display: false },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>

        <div className="chart-container">
          <h3>Market Share Distribution</h3>
          <Doughnut 
            data={doughnutData} 
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom' as const },
                title: { display: false },
              },
            }}
          />
        </div>
      </div>

      <div className="action-buttons">
        <button className="action-btn primary">
          <Download />
          Export Report
        </button>
        <button className="action-btn secondary">
          <Filter />
          Advanced Filters
        </button>
        <button className="action-btn secondary">
          <BarChart3 />
          Generate Insights
        </button>
      </div>
    </div>
  );
};

export default EnhancedAnalytics; 