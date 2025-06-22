import React, { useState, useEffect, useCallback } from 'react';
import { Download, RefreshCw } from 'lucide-react';

interface DataRecord {
  Record_ID: string;
  Customer_ID: string;
  Date: string;
  Payment_Method: string;
  Delivery_Area: string;
  [key: string]: any;
}

interface Restaurant {
  name: string;
  cuisine: string;
  avgPrice: number;
}

interface ClothingBrand {
  name: string;
  category: string;
  avgPrice: number;
}

interface ElectronicsBrand {
  name: string;
  category: string;
  avgPrice: number;
}

interface BookCategory {
  name: string;
  avgPrice: number;
}

interface CarBrand {
  name: string;
  category: string;
  avgPrice: number;
}

interface Hospital {
  name: string;
  specialty: string;
  avgPrice: number;
}

const DataGenerator: React.FC = () => {
  const [generatedData, setGeneratedData] = useState<DataRecord[]>([]);
  const [category, setCategory] = useState('food-delivery');
  const [numRows, setNumRows] = useState(200);
  const [dateRange, setDateRange] = useState(90);
  const [previewRows, setPreviewRows] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);

  // Data definitions
  const restaurants: Restaurant[] = [
    {name: "Pizza Palace", cuisine: "Italian", avgPrice: 350},
    {name: "Dragon Express", cuisine: "Chinese", avgPrice: 250},
    {name: "Burger Haven", cuisine: "American", avgPrice: 180},
    {name: "Spice Route", cuisine: "Indian", avgPrice: 220},
    {name: "Taco Fiesta", cuisine: "Mexican", avgPrice: 200},
    {name: "Sushi Zen", cuisine: "Japanese", avgPrice: 400},
    {name: "Mediterranean Delight", cuisine: "Mediterranean", avgPrice: 300},
    {name: "BBQ Master", cuisine: "American", avgPrice: 280},
    {name: "Thai Garden", cuisine: "Thai", avgPrice: 240},
    {name: "Pasta Corner", cuisine: "Italian", avgPrice: 230}
  ];

  const clothingBrands: ClothingBrand[] = [
    {name: "Fashion Forward", category: "Casual", avgPrice: 1200},
    {name: "Urban Style", category: "Streetwear", avgPrice: 800},
    {name: "Elegant Wear", category: "Formal", avgPrice: 2500},
    {name: "Sporty Gear", category: "Sports", avgPrice: 1500},
    {name: "Trendy Threads", category: "Fashion", avgPrice: 1800},
    {name: "Classic Collection", category: "Traditional", avgPrice: 2000},
    {name: "Youth Fashion", category: "Youth", avgPrice: 900},
    {name: "Premium Brands", category: "Luxury", avgPrice: 3500}
  ];

  const electronicsBrands: ElectronicsBrand[] = [
    {name: "TechZone", category: "Smartphones", avgPrice: 25000},
    {name: "Digital World", category: "Laptops", avgPrice: 45000},
    {name: "Audio Pro", category: "Headphones", avgPrice: 3000},
    {name: "Smart Home", category: "Smart Devices", avgPrice: 8000},
    {name: "Gaming Hub", category: "Gaming", avgPrice: 15000},
    {name: "Camera Store", category: "Cameras", avgPrice: 20000},
    {name: "Mobile World", category: "Mobile Accessories", avgPrice: 1500},
    {name: "Tech Solutions", category: "Computers", avgPrice: 35000}
  ];

  const bookCategories: BookCategory[] = [
    {name: "Fiction", avgPrice: 450},
    {name: "Non-Fiction", avgPrice: 600},
    {name: "Academic", avgPrice: 800},
    {name: "Children's Books", avgPrice: 300},
    {name: "Biography", avgPrice: 550},
    {name: "Self-Help", avgPrice: 400},
    {name: "Science", avgPrice: 700},
    {name: "History", avgPrice: 650}
  ];

  const carBrands: CarBrand[] = [
    {name: "Swift Motors", category: "Hatchback", avgPrice: 800000},
    {name: "Luxury Cars", category: "Sedan", avgPrice: 1500000},
    {name: "SUV World", category: "SUV", avgPrice: 1200000},
    {name: "Electric Drive", category: "Electric", avgPrice: 2000000},
    {name: "Compact Cars", category: "Compact", avgPrice: 600000},
    {name: "Premium Auto", category: "Luxury", avgPrice: 3000000}
  ];

  const hospitals: Hospital[] = [
    {name: "City General Hospital", specialty: "General", avgPrice: 5000},
    {name: "Cardiac Care Center", specialty: "Cardiology", avgPrice: 15000},
    {name: "Orthopedic Institute", specialty: "Orthopedics", avgPrice: 12000},
    {name: "Pediatric Care", specialty: "Pediatrics", avgPrice: 3000},
    {name: "Dental Clinic", specialty: "Dental", avgPrice: 2000},
    {name: "Eye Care Center", specialty: "Ophthalmology", avgPrice: 8000},
    {name: "Mental Health Clinic", specialty: "Psychiatry", avgPrice: 4000},
    {name: "Emergency Care", specialty: "Emergency", avgPrice: 10000}
  ];

  const areas = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune"];
  const paymentMethods = ["Credit Card", "Debit Card", "UPI", "Apple Pay", "Cash"];

  const generateData = useCallback(() => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const data: DataRecord[] = [];
      const customerIds: string[] = [];
      
      // Generate some repeat customer IDs
      for (let i = 1; i <= Math.floor(numRows * 0.6); i++) {
        customerIds.push(`CUST${String(i).padStart(4, '0')}`);
      }

      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - (dateRange * 24 * 60 * 60 * 1000));

      for (let i = 1; i <= numRows; i++) {
        const customerId = customerIds[Math.floor(Math.random() * customerIds.length)];
        const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
        
        let record: DataRecord = {
          Record_ID: `REC${String(i).padStart(5, '0')}`,
          Customer_ID: customerId,
          Date: randomDate.toISOString().split('T')[0],
          Payment_Method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
          Delivery_Area: areas[Math.floor(Math.random() * areas.length)]
        };

        switch(category) {
          case 'food-delivery':
            const restaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
            let hour = Math.random() < 0.3 ? 11 + Math.floor(Math.random() * 3) : 
                      Math.random() < 0.7 ? 17 + Math.floor(Math.random() * 4) : 
                      Math.floor(Math.random() * 24);
            const minute = Math.floor(Math.random() * 60);
            const orderTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
            
            const basePrice = restaurant.avgPrice;
            const variation = (Math.random() - 0.5) * 100;
            const orderValue = Math.max(100, Math.round((basePrice + variation) * 100) / 100);
            
            let deliveryTime = 20 + Math.floor(Math.random() * 25);
            if (hour >= 17 && hour <= 20) deliveryTime += Math.floor(Math.random() * 15);
            if (randomDate.getDay() === 0 || randomDate.getDay() === 6) deliveryTime += Math.floor(Math.random() * 10);
            
            record = {
              ...record,
              Restaurant_Name: restaurant.name,
              Cuisine_Type: restaurant.cuisine,
              Order_Time: orderTime,
              Order_Value: orderValue.toFixed(2),
              Delivery_Time_Minutes: deliveryTime
            };
            break;

          case 'clothing':
            const clothingBrand = clothingBrands[Math.floor(Math.random() * clothingBrands.length)];
            const clothingItems = ["T-Shirt", "Jeans", "Dress", "Shirt", "Jacket", "Shoes", "Accessories"];
            const item = clothingItems[Math.floor(Math.random() * clothingItems.length)];
            const clothingPrice = Math.max(200, Math.round((clothingBrand.avgPrice + (Math.random() - 0.5) * 500) * 100) / 100);
            
            record = {
              ...record,
              Brand_Name: clothingBrand.name,
              Category: clothingBrand.category,
              Item_Type: item,
              Size: ["XS", "S", "M", "L", "XL", "XXL"][Math.floor(Math.random() * 6)],
              Price: clothingPrice.toFixed(2),
              Color: ["Red", "Blue", "Black", "White", "Green", "Yellow"][Math.floor(Math.random() * 6)]
            };
            break;

          case 'electronics':
            const electronicsBrand = electronicsBrands[Math.floor(Math.random() * electronicsBrands.length)];
            const electronicsItems = ["Phone", "Laptop", "Headphones", "Smartwatch", "Tablet", "Camera"];
            const eItem = electronicsItems[Math.floor(Math.random() * electronicsItems.length)];
            const electronicsPrice = Math.max(1000, Math.round((electronicsBrand.avgPrice + (Math.random() - 0.5) * 5000) * 100) / 100);
            
            record = {
              ...record,
              Brand_Name: electronicsBrand.name,
              Category: electronicsBrand.category,
              Product_Type: eItem,
              Price: electronicsPrice.toFixed(2),
              Warranty_Months: [6, 12, 24][Math.floor(Math.random() * 3)],
              Rating: (3.5 + Math.random() * 1.5).toFixed(1)
            };
            break;

          case 'books':
            const bookCategory = bookCategories[Math.floor(Math.random() * bookCategories.length)];
            const bookTitles = ["The Great Adventure", "Science Today", "History Unveiled", "Life Lessons", "Mystery Solved"];
            const bookTitle = bookTitles[Math.floor(Math.random() * bookTitles.length)];
            const bookPrice = Math.max(100, Math.round((bookCategory.avgPrice + (Math.random() - 0.5) * 200) * 100) / 100);
            
            record = {
              ...record,
              Book_Title: bookTitle,
              Category: bookCategory.name,
              Author: `Author ${Math.floor(Math.random() * 100) + 1}`,
              Price: bookPrice.toFixed(2),
              Pages: Math.floor(Math.random() * 400) + 100,
              Language: ["English", "Hindi", "Tamil", "Telugu"][Math.floor(Math.random() * 4)]
            };
            break;

          case 'automotive':
            const carBrand = carBrands[Math.floor(Math.random() * carBrands.length)];
            const carModels = ["Model A", "Model B", "Model C", "Model D", "Model E"];
            const carModel = carModels[Math.floor(Math.random() * carModels.length)];
            const carPrice = Math.max(300000, Math.round((carBrand.avgPrice + (Math.random() - 0.5) * 200000) * 100) / 100);
            
            record = {
              ...record,
              Brand_Name: carBrand.name,
              Category: carBrand.category,
              Model: carModel,
              Price: carPrice.toFixed(2),
              Year: 2020 + Math.floor(Math.random() * 4),
              Fuel_Type: ["Petrol", "Diesel", "Electric", "Hybrid"][Math.floor(Math.random() * 4)]
            };
            break;

          case 'healthcare':
            const hospital = hospitals[Math.floor(Math.random() * hospitals.length)];
            const services = ["Consultation", "Surgery", "Test", "Treatment", "Checkup"];
            const service = services[Math.floor(Math.random() * services.length)];
            const servicePrice = Math.max(500, Math.round((hospital.avgPrice + (Math.random() - 0.5) * 2000) * 100) / 100);
            
            record = {
              ...record,
              Hospital_Name: hospital.name,
              Specialty: hospital.specialty,
              Service_Type: service,
              Price: servicePrice.toFixed(2),
              Doctor_Name: `Dr. ${["Smith", "Patel", "Kumar", "Singh", "Sharma"][Math.floor(Math.random() * 5)]}`,
              Duration_Minutes: Math.floor(Math.random() * 120) + 30
            };
            break;
        }

        data.push(record);
      }

      // Sort by date
      data.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
      
      setGeneratedData(data);
      setIsGenerating(false);
    }, 500);
  }, [category, numRows, dateRange]);

  const downloadCSV = () => {
    if (generatedData.length === 0) return;
    
    const headers = Object.keys(generatedData[0]);
    const csvContent = [
      headers.join(','),
      ...generatedData.map(row => headers.map(header => row[header]).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${category}_sample_data.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getTableHeaders = () => {
    switch(category) {
      case 'food-delivery':
        return ['Record_ID', 'Customer_ID', 'Restaurant_Name', 'Cuisine_Type', 'Date', 'Order_Time', 'Order_Value', 'Delivery_Area', 'Delivery_Time_Minutes', 'Payment_Method'];
      case 'clothing':
        return ['Record_ID', 'Customer_ID', 'Brand_Name', 'Category', 'Item_Type', 'Size', 'Price', 'Color', 'Date', 'Payment_Method'];
      case 'electronics':
        return ['Record_ID', 'Customer_ID', 'Brand_Name', 'Category', 'Product_Type', 'Price', 'Warranty_Months', 'Rating', 'Date', 'Payment_Method'];
      case 'books':
        return ['Record_ID', 'Customer_ID', 'Book_Title', 'Category', 'Author', 'Price', 'Pages', 'Language', 'Date', 'Payment_Method'];
      case 'automotive':
        return ['Record_ID', 'Customer_ID', 'Brand_Name', 'Category', 'Model', 'Price', 'Year', 'Fuel_Type', 'Date', 'Payment_Method'];
      case 'healthcare':
        return ['Record_ID', 'Customer_ID', 'Hospital_Name', 'Specialty', 'Service_Type', 'Price', 'Doctor_Name', 'Duration_Minutes', 'Date', 'Payment_Method'];
      default:
        return [];
    }
  };

  const getStats = () => {
    if (generatedData.length === 0) return { totalRevenue: 0, avgValue: 0, uniqueCustomers: 0, uniqueVendors: 0 };

    let totalRevenue = 0;
    let uniqueCustomers = new Set(generatedData.map(row => row.Customer_ID)).size;
    let uniqueVendors = 0;

    switch(category) {
      case 'food-delivery':
        totalRevenue = generatedData.reduce((sum, row) => sum + parseFloat(row.Order_Value), 0);
        uniqueVendors = new Set(generatedData.map(row => row.Restaurant_Name)).size;
        break;
      case 'clothing':
      case 'electronics':
      case 'automotive':
        totalRevenue = generatedData.reduce((sum, row) => sum + parseFloat(row.Price), 0);
        uniqueVendors = new Set(generatedData.map(row => row.Brand_Name)).size;
        break;
      case 'books':
        totalRevenue = generatedData.reduce((sum, row) => sum + parseFloat(row.Price), 0);
        uniqueVendors = new Set(generatedData.map(row => row.Category)).size;
        break;
      case 'healthcare':
        totalRevenue = generatedData.reduce((sum, row) => sum + parseFloat(row.Price), 0);
        uniqueVendors = new Set(generatedData.map(row => row.Hospital_Name)).size;
        break;
    }

    const avgValue = totalRevenue / generatedData.length;
    return { totalRevenue, avgValue, uniqueCustomers, uniqueVendors };
  };

  const getStatLabels = () => {
    switch(category) {
      case 'food-delivery':
        return ['Total Revenue', 'Avg Order Value', 'Unique Customers', 'Partner Restaurants'];
      case 'clothing':
        return ['Total Revenue', 'Avg Item Value', 'Unique Customers', 'Brand Partners'];
      case 'electronics':
        return ['Total Revenue', 'Avg Product Value', 'Unique Customers', 'Brand Partners'];
      case 'books':
        return ['Total Revenue', 'Avg Book Value', 'Unique Customers', 'Categories'];
      case 'automotive':
        return ['Total Revenue', 'Avg Vehicle Value', 'Unique Customers', 'Brand Partners'];
      case 'healthcare':
        return ['Total Revenue', 'Avg Service Value', 'Unique Patients', 'Hospitals'];
      default:
        return ['', '', '', ''];
    }
  };

  useEffect(() => {
    generateData();
  }, [generateData]);

  const stats = getStats();
  const statLabels = getStatLabels();
  const headers = getTableHeaders();
  const previewData = generatedData.slice(0, previewRows);

  return (
    <div className="data-generator">
      <div className="generator-header">
        <h1>📊 Multi-Category Sample Data Generator</h1>
        <p>Generate realistic sample data for various business categories</p>
      </div>

      <div className="controls-panel">
        <div className="control-group">
          <label>Data Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="food-delivery">🍕 Food Delivery</option>
            <option value="clothing">👕 Clothing & Fashion</option>
            <option value="electronics">📱 Electronics</option>
            <option value="books">📚 Books & Literature</option>
            <option value="automotive">🚗 Automotive</option>
            <option value="healthcare">🏥 Healthcare</option>
          </select>
        </div>

        <div className="control-group">
          <label>Number of Records:</label>
          <input 
            type="number" 
            value={numRows} 
            onChange={(e) => setNumRows(parseInt(e.target.value))}
            min="50" 
            max="1000" 
          />
        </div>

        <div className="control-group">
          <label>Date Range:</label>
          <select value={dateRange} onChange={(e) => setDateRange(parseInt(e.target.value))}>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 3 Months</option>
            <option value="180">Last 6 Months</option>
          </select>
        </div>

        <div className="control-group">
          <label>Preview Rows:</label>
          <input 
            type="number" 
            value={previewRows} 
            onChange={(e) => setPreviewRows(parseInt(e.target.value))}
            min="1" 
            max="50" 
          />
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="action-btn primary"
          onClick={generateData}
          disabled={isGenerating}
        >
          <RefreshCw className={isGenerating ? 'spinning' : ''} />
          {isGenerating ? 'Generating...' : 'Generate Data'}
        </button>
        
        <button 
          className="action-btn secondary"
          onClick={downloadCSV}
          disabled={generatedData.length === 0}
        >
          <Download />
          Download CSV
        </button>
      </div>

      {generatedData.length > 0 && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{statLabels[0]}</h3>
            <p className="stat-value">₹{stats.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>{statLabels[1]}</h3>
            <p className="stat-value">₹{stats.avgValue.toFixed(2)}</p>
          </div>
          <div className="stat-card">
            <h3>{statLabels[2]}</h3>
            <p className="stat-value">{stats.uniqueCustomers}</p>
          </div>
          <div className="stat-card">
            <h3>{statLabels[3]}</h3>
            <p className="stat-value">{stats.uniqueVendors}</p>
          </div>
        </div>
      )}

      {generatedData.length > 0 && (
        <div className="data-preview">
          <h3>📊 Data Preview ({previewRows} Rows)</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {headers.map(header => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, index) => (
                  <tr key={index}>
                    {headers.map(header => (
                      <td key={header}>
                        {header.includes('Value') || header.includes('Price') 
                          ? `₹${row[header]}` 
                          : row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataGenerator; 