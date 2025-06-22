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
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingCart,
  Download,
  Filter,
  RefreshCw,
  BarChart3,
  Upload,
  FileText,
  AlertCircle,
  CheckCircle
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

interface UploadedData {
  headers: string[];
  data: any[];
  fileName: string;
  fileSize: number;
}

interface AnalyticsMetrics {
  totalRecords: number;
  totalRevenue: number;
  avgOrderValue: number;
  uniqueCustomers: number;
  topCategories: { category: string; count: number }[];
  revenueByMonth: { month: string; revenue: number }[];
  paymentMethodDistribution: { method: string; count: number }[];
  customerSegmentation: { segment: string; count: number }[];
}

const EnhancedAnalytics: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('food-delivery');
  const [timeRange, setTimeRange] = useState('30');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedData, setUploadedData] = useState<UploadedData | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [useUploadedData, setUseUploadedData] = useState(false);

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

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsLoading(true);

    // Validate file type
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Please upload a CSV file');
      setIsLoading(false);
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      setIsLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        
        const data = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
            const row: any = {};
            headers.forEach((header, index) => {
              row[header] = values[index] || '';
            });
            return row;
          });

        setUploadedData({
          headers,
          data,
          fileName: file.name,
          fileSize: file.size
        });

        // Auto-analyze the data
        analyzeData(headers, data);
      } catch (err) {
        setError('Error reading CSV file. Please check the format.');
      }
      setIsLoading(false);
    };

    reader.readAsText(file);
  }, []);

  const analyzeData = useCallback((headers: string[], data: any[]) => {
    setIsAnalyzing(true);
    
    // Simulate analysis time
    setTimeout(() => {
      try {
        const metrics = calculateMetrics(headers, data);
        setAnalytics(metrics);
        setUseUploadedData(true);
      } catch (err) {
        setError('Error analyzing data');
      }
      setIsAnalyzing(false);
    }, 2000);
  }, []);

  const calculateMetrics = (headers: string[], data: any[]): AnalyticsMetrics => {
    // Find relevant columns
    const revenueColumn = headers.find(h => 
      h.toLowerCase().includes('revenue') || 
      h.toLowerCase().includes('amount') || 
      h.toLowerCase().includes('price') ||
      h.toLowerCase().includes('value')
    );
    
    const customerColumn = headers.find(h => 
      h.toLowerCase().includes('customer') || 
      h.toLowerCase().includes('user') ||
      h.toLowerCase().includes('client')
    );
    
    const categoryColumn = headers.find(h => 
      h.toLowerCase().includes('category') || 
      h.toLowerCase().includes('type') ||
      h.toLowerCase().includes('product')
    );
    
    const dateColumn = headers.find(h => 
      h.toLowerCase().includes('date') || 
      h.toLowerCase().includes('time')
    );
    
    const paymentColumn = headers.find(h => 
      h.toLowerCase().includes('payment') || 
      h.toLowerCase().includes('method')
    );

    // Calculate metrics
    const totalRecords = data.length;
    
    const totalRevenue = revenueColumn ? 
      data.reduce((sum, row) => {
        const value = parseFloat(row[revenueColumn]) || 0;
        return sum + value;
      }, 0) : 0;
    
    const avgOrderValue = totalRecords > 0 ? totalRevenue / totalRecords : 0;
    
    const uniqueCustomers = customerColumn ? 
      new Set(data.map(row => row[customerColumn])).size : 0;

    // Category analysis
    const categoryCounts: { [key: string]: number } = {};
    if (categoryColumn) {
      data.forEach(row => {
        const category = row[categoryColumn] || 'Unknown';
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
    }
    const topCategories = Object.entries(categoryCounts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Revenue by month
    const revenueByMonth: { [key: string]: number } = {};
    if (dateColumn && revenueColumn) {
      data.forEach(row => {
        const dateStr = row[dateColumn];
        if (dateStr) {
          const date = new Date(dateStr);
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          const revenue = parseFloat(row[revenueColumn]) || 0;
          revenueByMonth[monthKey] = (revenueByMonth[monthKey] || 0) + revenue;
        }
      });
    }
    const revenueByMonthArray = Object.entries(revenueByMonth)
      .map(([month, revenue]) => ({ month, revenue }))
      .sort((a, b) => a.month.localeCompare(b.month));

    // Payment method distribution
    const paymentCounts: { [key: string]: number } = {};
    if (paymentColumn) {
      data.forEach(row => {
        const method = row[paymentColumn] || 'Unknown';
        paymentCounts[method] = (paymentCounts[method] || 0) + 1;
      });
    }
    const paymentMethodDistribution = Object.entries(paymentCounts)
      .map(([method, count]) => ({ method, count }))
      .sort((a, b) => b.count - a.count);

    // Customer segmentation (by order value)
    const customerSegments: { [key: string]: number } = {
      'High Value': 0,
      'Medium Value': 0,
      'Low Value': 0
    };
    
    if (revenueColumn) {
      data.forEach(row => {
        const value = parseFloat(row[revenueColumn]) || 0;
        if (value > avgOrderValue * 1.5) {
          customerSegments['High Value']++;
        } else if (value < avgOrderValue * 0.5) {
          customerSegments['Low Value']++;
        } else {
          customerSegments['Medium Value']++;
        }
      });
    }
    
    const customerSegmentation = Object.entries(customerSegments)
      .map(([segment, count]) => ({ segment, count }));

    return {
      totalRecords,
      totalRevenue,
      avgOrderValue,
      uniqueCustomers,
      topCategories,
      revenueByMonth: revenueByMonthArray,
      paymentMethodDistribution,
      customerSegmentation
    };
  };

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setChartData(generateSampleData());
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!useUploadedData) {
      setChartData(generateSampleData());
    }
  }, [generateSampleData, selectedCategory, useUploadedData]);

  const lineChartData = {
    labels: useUploadedData && analytics?.revenueByMonth.length ? 
      analytics.revenueByMonth.map(item => item.month) : 
      chartData.map(d => d.date),
    datasets: [
      {
        label: 'Revenue (₹)',
        data: useUploadedData && analytics?.revenueByMonth.length ? 
          analytics.revenueByMonth.map(item => item.revenue) : 
          chartData.map(d => d.revenue),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Orders',
        data: useUploadedData ? 
          (analytics?.topCategories.map(item => item.count) || []) : 
          chartData.map(d => d.orders),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: useUploadedData && analytics?.topCategories.length ? 
      analytics.topCategories.map(item => item.category) : 
      ['Food Delivery', 'Clothing', 'Electronics', 'Books', 'Automotive', 'Healthcare'],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: useUploadedData && analytics?.topCategories.length ? 
          analytics.topCategories.map(item => item.count * 1000) : // Convert count to revenue estimate
          [450000, 320000, 280000, 180000, 1200000, 350000],
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
    labels: useUploadedData && analytics?.paymentMethodDistribution.length ? 
      analytics.paymentMethodDistribution.map(item => item.method) : 
      ['Food Delivery', 'Clothing', 'Electronics', 'Books', 'Automotive', 'Healthcare'],
    datasets: [
      {
        data: useUploadedData && analytics?.paymentMethodDistribution.length ? 
          analytics.paymentMethodDistribution.map(item => item.count) : 
          [35, 25, 20, 10, 8, 2],
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

  const pieData = {
    labels: useUploadedData && analytics?.customerSegmentation.length ? 
      analytics.customerSegmentation.map(item => item.segment) : 
      ['High Value', 'Medium Value', 'Low Value'],
    datasets: [
      {
        data: useUploadedData && analytics?.customerSegmentation.length ? 
          analytics.customerSegmentation.map(item => item.count) : 
          [30, 45, 25],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      },
    ],
  };

  const totalRevenue = useUploadedData && analytics ? analytics.totalRevenue : chartData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = useUploadedData && analytics ? analytics.totalRecords : chartData.reduce((sum, d) => sum + d.orders, 0);
  const totalCustomers = useUploadedData && analytics ? analytics.uniqueCustomers : chartData.reduce((sum, d) => sum + d.customers, 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="enhanced-analytics">
      <div className="analytics-header">
        <h1>📊 Enhanced Multi-Category Analytics Dashboard</h1>
        <p>Real-time insights and advanced data visualization</p>
      </div>

      {/* File Upload Section */}
      <div className="upload-section" style={{ 
        backgroundColor: 'rgba(255,255,255,0.1)', 
        padding: '20px', 
        borderRadius: '12px', 
        marginBottom: '20px',
        border: '2px dashed rgba(255,255,255,0.3)'
      }}>
        <h3 style={{ marginTop: 0, color: 'white' }}>📁 Upload Your Data for Analysis</h3>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '15px' }}>
          Upload a CSV file to analyze your own data, or use the controls below for sample data
        </p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            id="file-upload"
            style={{ display: 'none' }}
          />
          <label 
            htmlFor="file-upload" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#667eea',
              color: 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5a6fd8'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#667eea'}
          >
            <Upload size={16} />
            {isLoading ? 'Processing...' : 'Choose CSV File'}
          </label>
          
          {uploadedData && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4ade80' }}>
              <CheckCircle size={16} />
              <span>{uploadedData.fileName} ({(uploadedData.fileSize / 1024).toFixed(1)} KB)</span>
            </div>
          )}
          
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f87171' }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {useUploadedData && (
            <button 
              onClick={() => {
                setUseUploadedData(false);
                setUploadedData(null);
                setAnalytics(null);
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Use Sample Data
            </button>
          )}
        </div>
      </div>

      {isAnalyzing && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px', 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <RefreshCw className="spinning" size={24} style={{ marginRight: '10px' }} />
          <span>Analyzing your data...</span>
        </div>
      )}

      {/* Controls Panel - Only show if not using uploaded data */}
      {!useUploadedData && (
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
      )}

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
            <h3>Unique Customers</h3>
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

      <div className="analytics-charts">
        <div className="chart-container">
          <h3>Revenue Trend</h3>
          <Line data={lineChartData} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: 'white'
                }
              }
            },
            scales: {
              x: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255,255,255,0.1)' }
              },
              y: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255,255,255,0.1)' }
              }
            }
          }} />
        </div>

        <div className="chart-container">
          <h3>Category Performance</h3>
          <Bar data={barChartData} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: 'white'
                }
              }
            },
            scales: {
              x: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255,255,255,0.1)' }
              },
              y: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255,255,255,0.1)' }
              }
            }
          }} />
        </div>

        <div className="chart-container">
          <h3>Payment Methods</h3>
          <Doughnut data={doughnutData} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: 'white'
                }
              }
            }
          }} />
        </div>

        <div className="chart-container">
          <h3>Customer Segmentation</h3>
          <Pie data={pieData} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: 'white'
                }
              }
            }
          }} />
        </div>
      </div>
    </div>
  );
};

export default EnhancedAnalytics; 