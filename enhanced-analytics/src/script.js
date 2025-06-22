let generatedData = [];
let chartInstances = {};

// Food Delivery Data
const restaurants = [
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

// Clothing Data
const clothingBrands = [
    {name: "Fashion Forward", category: "Casual", avgPrice: 1200},
    {name: "Urban Style", category: "Streetwear", avgPrice: 800},
    {name: "Elegant Wear", category: "Formal", avgPrice: 2500},
    {name: "Sporty Gear", category: "Sports", avgPrice: 1500},
    {name: "Trendy Threads", category: "Fashion", avgPrice: 1800},
    {name: "Classic Collection", category: "Traditional", avgPrice: 2000},
    {name: "Youth Fashion", category: "Youth", avgPrice: 900},
    {name: "Premium Brands", category: "Luxury", avgPrice: 3500}
];

// Electronics Data
const electronicsBrands = [
    {name: "TechZone", category: "Smartphones", avgPrice: 25000},
    {name: "Digital World", category: "Laptops", avgPrice: 45000},
    {name: "Audio Pro", category: "Headphones", avgPrice: 3000},
    {name: "Smart Home", category: "Smart Devices", avgPrice: 8000},
    {name: "Gaming Hub", category: "Gaming", avgPrice: 15000},
    {name: "Camera Store", category: "Cameras", avgPrice: 20000},
    {name: "Mobile World", category: "Mobile Accessories", avgPrice: 1500},
    {name: "Tech Solutions", category: "Computers", avgPrice: 35000}
];

// Books Data
const bookCategories = [
    {name: "Fiction", avgPrice: 450},
    {name: "Non-Fiction", avgPrice: 600},
    {name: "Academic", avgPrice: 800},
    {name: "Children's Books", avgPrice: 300},
    {name: "Biography", avgPrice: 550},
    {name: "Self-Help", avgPrice: 400},
    {name: "Science", avgPrice: 700},
    {name: "History", avgPrice: 650}
];

// Automotive Data
const carBrands = [
    {name: "Swift Motors", category: "Hatchback", avgPrice: 800000},
    {name: "Luxury Cars", category: "Sedan", avgPrice: 1500000},
    {name: "SUV World", category: "SUV", avgPrice: 1200000},
    {name: "Electric Drive", category: "Electric", avgPrice: 2000000},
    {name: "Compact Cars", category: "Compact", avgPrice: 600000},
    {name: "Premium Auto", category: "Luxury", avgPrice: 3000000}
];

// Healthcare Data
const hospitals = [
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

function generateData() {
    const category = document.getElementById('category').value;
    const numRows = parseInt(document.getElementById('numRows').value);
    const dateRange = parseInt(document.getElementById('dateRange').value);
    
    generatedData = [];
    const customerIds = [];
    
    // Generate some repeat customer IDs
    for (let i = 1; i <= Math.floor(numRows * 0.6); i++) {
        customerIds.push(`CUST${String(i).padStart(4, '0')}`);
    }

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (dateRange * 24 * 60 * 60 * 1000));

    for (let i = 1; i <= numRows; i++) {
        const customerId = customerIds[Math.floor(Math.random() * customerIds.length)];
        const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
        
        let record = {
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

        generatedData.push(record);
    }

    // Sort by date
    generatedData.sort((a, b) => new Date(a.Date) - new Date(b.Date));

    displayPreview();
    updateStats();
    document.getElementById('downloadBtn').disabled = false;
}

function displayPreview() {
    const tableBody = document.getElementById('tableBody');
    const previewRows = parseInt(document.getElementById('previewRows').value);
    const category = document.getElementById('category').value;
    tableBody.innerHTML = '';
    
    // Update table headers based on category
    updateTableHeaders(category);
    
    const previewData = generatedData.slice(0, previewRows);
    previewData.forEach(row => {
        const tr = document.createElement('tr');
        let rowHtml = '';
        
        switch(category) {
            case 'food-delivery':
                rowHtml = `
                    <td>${row.Record_ID}</td>
                    <td>${row.Customer_ID}</td>
                    <td>${row.Restaurant_Name}</td>
                    <td>${row.Cuisine_Type}</td>
                    <td>${row.Date}</td>
                    <td>${row.Order_Time}</td>
                    <td>₹${row.Order_Value}</td>
                    <td>${row.Delivery_Area}</td>
                    <td>${row.Delivery_Time_Minutes}</td>
                    <td>${row.Payment_Method}</td>
                `;
                break;
            case 'clothing':
                rowHtml = `
                    <td>${row.Record_ID}</td>
                    <td>${row.Customer_ID}</td>
                    <td>${row.Brand_Name}</td>
                    <td>${row.Category}</td>
                    <td>${row.Item_Type}</td>
                    <td>${row.Size}</td>
                    <td>₹${row.Price}</td>
                    <td>${row.Color}</td>
                    <td>${row.Date}</td>
                    <td>${row.Payment_Method}</td>
                `;
                break;
            case 'electronics':
                rowHtml = `
                    <td>${row.Record_ID}</td>
                    <td>${row.Customer_ID}</td>
                    <td>${row.Brand_Name}</td>
                    <td>${row.Category}</td>
                    <td>${row.Product_Type}</td>
                    <td>₹${row.Price}</td>
                    <td>${row.Warranty_Months}</td>
                    <td>${row.Rating}</td>
                    <td>${row.Date}</td>
                    <td>${row.Payment_Method}</td>
                `;
                break;
            case 'books':
                rowHtml = `
                    <td>${row.Record_ID}</td>
                    <td>${row.Customer_ID}</td>
                    <td>${row.Book_Title}</td>
                    <td>${row.Category}</td>
                    <td>${row.Author}</td>
                    <td>₹${row.Price}</td>
                    <td>${row.Pages}</td>
                    <td>${row.Language}</td>
                    <td>${row.Date}</td>
                    <td>${row.Payment_Method}</td>
                `;
                break;
            case 'automotive':
                rowHtml = `
                    <td>${row.Record_ID}</td>
                    <td>${row.Customer_ID}</td>
                    <td>${row.Brand_Name}</td>
                    <td>${row.Category}</td>
                    <td>${row.Model}</td>
                    <td>₹${row.Price}</td>
                    <td>${row.Year}</td>
                    <td>${row.Fuel_Type}</td>
                    <td>${row.Date}</td>
                    <td>${row.Payment_Method}</td>
                `;
                break;
            case 'healthcare':
                rowHtml = `
                    <td>${row.Record_ID}</td>
                    <td>${row.Customer_ID}</td>
                    <td>${row.Hospital_Name}</td>
                    <td>${row.Specialty}</td>
                    <td>${row.Service_Type}</td>
                    <td>₹${row.Price}</td>
                    <td>${row.Doctor_Name}</td>
                    <td>${row.Duration_Minutes}</td>
                    <td>${row.Date}</td>
                    <td>${row.Payment_Method}</td>
                `;
                break;
        }
        
        tr.innerHTML = rowHtml;
        tableBody.appendChild(tr);
    });
    
    document.getElementById('previewCount').textContent = previewRows;
    document.getElementById('preview').style.display = 'block';
}

function updateTableHeaders(category) {
    const thead = document.querySelector('#dataTable thead tr');
    let headers = [];
    
    switch(category) {
        case 'food-delivery':
            headers = ['Record_ID', 'Customer_ID', 'Restaurant_Name', 'Cuisine_Type', 'Date', 'Order_Time', 'Order_Value', 'Delivery_Area', 'Delivery_Time_Minutes', 'Payment_Method'];
            break;
        case 'clothing':
            headers = ['Record_ID', 'Customer_ID', 'Brand_Name', 'Category', 'Item_Type', 'Size', 'Price', 'Color', 'Date', 'Payment_Method'];
            break;
        case 'electronics':
            headers = ['Record_ID', 'Customer_ID', 'Brand_Name', 'Category', 'Product_Type', 'Price', 'Warranty_Months', 'Rating', 'Date', 'Payment_Method'];
            break;
        case 'books':
            headers = ['Record_ID', 'Customer_ID', 'Book_Title', 'Category', 'Author', 'Price', 'Pages', 'Language', 'Date', 'Payment_Method'];
            break;
        case 'automotive':
            headers = ['Record_ID', 'Customer_ID', 'Brand_Name', 'Category', 'Model', 'Price', 'Year', 'Fuel_Type', 'Date', 'Payment_Method'];
            break;
        case 'healthcare':
            headers = ['Record_ID', 'Customer_ID', 'Hospital_Name', 'Specialty', 'Service_Type', 'Price', 'Doctor_Name', 'Duration_Minutes', 'Date', 'Payment_Method'];
            break;
    }
    
    thead.innerHTML = headers.map(header => `<th>${header}</th>`).join('');
}

function updateStats() {
    const category = document.getElementById('category').value;
    let totalRevenue = 0;
    let avgValue = 0;
    let uniqueCustomers = new Set(generatedData.map(row => row.Customer_ID)).size;
    let uniqueVendors = 0;
    
    switch(category) {
        case 'food-delivery':
            totalRevenue = generatedData.reduce((sum, row) => sum + parseFloat(row.Order_Value), 0);
            avgValue = totalRevenue / generatedData.length;
            uniqueVendors = new Set(generatedData.map(row => row.Restaurant_Name)).size;
            break;
        case 'clothing':
            totalRevenue = generatedData.reduce((sum, row) => sum + parseFloat(row.Price), 0);
            avgValue = totalRevenue / generatedData.length;
            uniqueVendors = new Set(generatedData.map(row => row.Brand_Name)).size;
            break;
        case 'electronics':
            totalRevenue = generatedData.reduce((sum, row) => sum + parseFloat(row.Price), 0);
            avgValue = totalRevenue / generatedData.length;
            uniqueVendors = new Set(generatedData.map(row => row.Brand_Name)).size;
            break;
        case 'books':
            totalRevenue = generatedData.reduce((sum, row) => sum + parseFloat(row.Price), 0);
            avgValue = totalRevenue / generatedData.length;
            uniqueVendors = new Set(generatedData.map(row => row.Category)).size;
            break;
        case 'automotive':
            totalRevenue = generatedData.reduce((sum, row) => sum + parseFloat(row.Price), 0);
            avgValue = totalRevenue / generatedData.length;
            uniqueVendors = new Set(generatedData.map(row => row.Brand_Name)).size;
            break;
        case 'healthcare':
            totalRevenue = generatedData.reduce((sum, row) => sum + parseFloat(row.Price), 0);
            avgValue = totalRevenue / generatedData.length;
            uniqueVendors = new Set(generatedData.map(row => row.Hospital_Name)).size;
            break;
    }
    
    // Update the stats in the new unified interface
    // These will be updated by the enhanced stats function, so we don't need to do anything here
    // Just ensure the stats section is visible
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        statsSection.style.display = 'grid';
    }
}

function downloadCSV() {
    if (generatedData.length === 0) return;
    
    const headers = Object.keys(generatedData[0]);
    const csvContent = [
        headers.join(','),
        ...generatedData.map(row => headers.map(header => row[header]).join(','))
    ].join('\n');
    
    const category = document.getElementById('category').value;
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
}

// Generate initial data
generateData();

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('previewRows').addEventListener('input', function() {
        if (generatedData.length > 0) {
            displayPreview();
        }
    });
    
    document.getElementById('category').addEventListener('change', function() {
        generateData();
    });
});

// Tab switching functionality
function switchTab(tabName) {
    // Update tab buttons
    document.getElementById('generatorTab').classList.remove('active');
    document.getElementById('analyticsTab').classList.remove('active');
    
    // Hide all tab contents
    document.getElementById('generatorContent').classList.remove('active');
    document.getElementById('analyticsContent').classList.remove('active');
    
    // Show selected tab
    if (tabName === 'generator') {
        document.getElementById('generatorTab').classList.add('active');
        document.getElementById('generatorContent').classList.add('active');
    } else if (tabName === 'analytics') {
        document.getElementById('analyticsTab').classList.add('active');
        document.getElementById('analyticsContent').classList.add('active');
    }
}

// Unified function to generate data and analytics together
function generateDataAndAnalytics() {
    // Show loading indicator
    document.getElementById('loadingIndicator').style.display = 'flex';
    document.getElementById('dashboardContent').style.display = 'none';
    
    // Get parameters
    const category = document.getElementById('category').value;
    const numRows = parseInt(document.getElementById('numRows').value);
    const dateRange = parseInt(document.getElementById('dateRange').value);
    const previewRows = parseInt(document.getElementById('previewRows').value);
    
    // Generate data using the original function but without the display calls
    generateDataWithoutDisplay();
    
    // Wait a bit for data generation, then show dashboard
    setTimeout(() => {
        // Hide loading indicator
        document.getElementById('loadingIndicator').style.display = 'none';
        
        // Show dashboard content
        document.getElementById('dashboardContent').style.display = 'block';
        
        // Update table headers for the category
        updateTableHeaders(category);
        
        // Display preview first
        displayPreview();
        
        // Update stats
        updateStats();
        
        // Generate comprehensive analytics
        generateComprehensiveAnalytics(category, numRows);
        
        // Enable download button
        document.getElementById('downloadBtn').disabled = false;
        
        // Smooth scroll to top to show data preview first
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
}

// Generate data without displaying (modified version of original generateData)
function generateDataWithoutDisplay() {
    const category = document.getElementById('category').value;
    const numRows = parseInt(document.getElementById('numRows').value);
    const dateRange = parseInt(document.getElementById('dateRange').value);
    
    generatedData = [];
    const customerIds = [];
    
    // Generate some repeat customer IDs
    for (let i = 1; i <= Math.floor(numRows * 0.6); i++) {
        customerIds.push(`CUST${String(i).padStart(4, '0')}`);
    }

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (dateRange * 24 * 60 * 60 * 1000));

    for (let i = 1; i <= numRows; i++) {
        const customerId = customerIds[Math.floor(Math.random() * customerIds.length)];
        const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
        
        let record = {
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

        generatedData.push(record);
    }

    // Sort by date
    generatedData.sort((a, b) => new Date(a.Date) - new Date(b.Date));
}

// Comprehensive analytics function
function generateComprehensiveAnalytics(category, numRows) {
    // Use the generated data directly
    const analyticsData = generatedData;
    
    // Update enhanced stats
    updateEnhancedStats(analyticsData, category);
    
    // Create all charts
    createComprehensiveCharts(analyticsData, category);
    
    // Generate advanced insights
    generateAdvancedInsights(analyticsData, category);
}

// Update enhanced stats with more detailed metrics
function updateEnhancedStats(data, category) {
    const totalRevenue = data.reduce((sum, item) => sum + parseFloat(item.Price || item.Order_Value || 0), 0);
    const totalOrders = data.length;
    const uniqueCustomers = new Set(data.map(item => item.Customer_ID)).size;
    const avgOrderValue = totalRevenue / totalOrders;
    
    // Calculate growth metrics (comparing first half vs second half)
    const sortedData = data.sort((a, b) => new Date(a.Date) - new Date(b.Date));
    const midPoint = Math.floor(sortedData.length / 2);
    const firstHalf = sortedData.slice(0, midPoint);
    const secondHalf = sortedData.slice(midPoint);
    
    const firstHalfRevenue = firstHalf.reduce((sum, item) => sum + parseFloat(item.Price || item.Order_Value || 0), 0);
    const secondHalfRevenue = secondHalf.reduce((sum, item) => sum + parseFloat(item.Price || item.Order_Value || 0), 0);
    const revenueGrowth = firstHalfRevenue > 0 ? ((secondHalfRevenue - firstHalfRevenue) / firstHalfRevenue * 100).toFixed(1) : 0;
    
    // Calculate unique vendors/stores
    let uniqueVendors = 0;
    switch(category) {
        case 'food-delivery':
            uniqueVendors = new Set(data.map(item => item.Restaurant_Name)).size;
            break;
        case 'clothing':
        case 'electronics':
        case 'automotive':
            uniqueVendors = new Set(data.map(item => item.Brand_Name)).size;
            break;
        case 'books':
            uniqueVendors = new Set(data.map(item => item.Category)).size;
            break;
        case 'healthcare':
            uniqueVendors = new Set(data.map(item => item.Specialty)).size;
            break;
    }
    
    // Update stats with enhanced metrics
    document.getElementById('totalRevenue').textContent = `₹${totalRevenue.toLocaleString()}`;
    document.getElementById('avgOrder').textContent = `₹${avgOrderValue.toFixed(2)}`;
    document.getElementById('totalCustomers').textContent = uniqueCustomers;
    document.getElementById('totalRestaurants').textContent = uniqueVendors;
    
    // Update change indicators
    const revenueChange = document.querySelector('#totalRevenue').parentElement.querySelector('.stat-change');
    const avgOrderChange = document.querySelector('#avgOrder').parentElement.querySelector('.stat-change');
    const customersChange = document.querySelector('#totalCustomers').parentElement.querySelector('.stat-change');
    const vendorsChange = document.querySelector('#totalRestaurants').parentElement.querySelector('.stat-change');
    
    revenueChange.textContent = `${revenueGrowth > 0 ? '+' : ''}${revenueGrowth}% vs baseline`;
    revenueChange.className = `stat-change ${revenueGrowth >= 0 ? 'positive' : 'negative'}`;
    
    // Calculate other growth metrics
    const firstHalfAvg = firstHalf.length > 0 ? firstHalf.reduce((sum, item) => sum + parseFloat(item.Price || item.Order_Value || 0), 0) / firstHalf.length : 0;
    const secondHalfAvg = secondHalf.length > 0 ? secondHalf.reduce((sum, item) => sum + parseFloat(item.Price || item.Order_Value || 0), 0) / secondHalf.length : 0;
    const avgOrderGrowth = firstHalfAvg > 0 ? ((secondHalfAvg - firstHalfAvg) / firstHalfAvg * 100).toFixed(1) : 0;
    
    avgOrderChange.textContent = `${avgOrderGrowth > 0 ? '+' : ''}${avgOrderGrowth}% vs baseline`;
    avgOrderChange.className = `stat-change ${avgOrderGrowth >= 0 ? 'positive' : 'negative'}`;
    
    // Customer growth
    const firstHalfCustomers = new Set(firstHalf.map(item => item.Customer_ID)).size;
    const secondHalfCustomers = new Set(secondHalf.map(item => item.Customer_ID)).size;
    const customerGrowth = firstHalfCustomers > 0 ? ((secondHalfCustomers - firstHalfCustomers) / firstHalfCustomers * 100).toFixed(1) : 0;
    
    customersChange.textContent = `${customerGrowth > 0 ? '+' : ''}${customerGrowth}% vs baseline`;
    customersChange.className = `stat-change ${customerGrowth >= 0 ? 'positive' : 'negative'}`;
    
    // Vendor growth
    const firstHalfVendors = new Set(firstHalf.map(item => item.Restaurant_Name || item.Brand_Name || item.Category || item.Specialty)).size;
    const secondHalfVendors = new Set(secondHalf.map(item => item.Restaurant_Name || item.Brand_Name || item.Category || item.Specialty)).size;
    const vendorGrowth = firstHalfVendors > 0 ? ((secondHalfVendors - firstHalfVendors) / firstHalfVendors * 100).toFixed(1) : 0;
    
    vendorsChange.textContent = `${vendorGrowth > 0 ? '+' : ''}${vendorGrowth}% vs baseline`;
    vendorsChange.className = `stat-change ${vendorGrowth >= 0 ? 'positive' : 'negative'}`;
}

// Create comprehensive charts with all visualizations
function createComprehensiveCharts(data, category) {
    // Destroy existing charts
    Object.values(chartInstances).forEach(chart => {
        if (chart) chart.destroy();
    });
    chartInstances = {};

    // Revenue Trend Chart with moving average
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueData = generateEnhancedRevenueData(data);
    chartInstances.revenue = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: revenueData.labels,
            datasets: [{
                label: 'Daily Revenue',
                data: revenueData.values,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true,
                order: 2
            }, {
                label: '7-Day Moving Average',
                data: revenueData.movingAverage,
                borderColor: '#e74c3c',
                backgroundColor: 'transparent',
                borderDash: [5, 5],
                tension: 0.4,
                order: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ₹' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Category Distribution Chart
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    const categoryData = generateEnhancedCategoryData(data, category);
    chartInstances.category = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: categoryData.labels,
            datasets: [{
                data: categoryData.values,
                backgroundColor: [
                    '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe',
                    '#ff9a9e', '#fecfef', '#fecfef', '#ffecd2', '#fcb69f', '#ff9a9e'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 10,
                        generateLabels: function(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.labels.map((label, i) => {
                                    const value = data.datasets[0].data[i];
                                    const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    return {
                                        text: `${label} (${percentage}%)`,
                                        fillStyle: data.datasets[0].backgroundColor[i],
                                        strokeStyle: data.datasets[0].backgroundColor[i],
                                        lineWidth: 0,
                                        hidden: false,
                                        index: i
                                    };
                                });
                            }
                            return [];
                        }
                    }
                }
            }
        }
    });

    // Daily Orders Chart with trend analysis
    const ordersCtx = document.getElementById('ordersChart').getContext('2d');
    const ordersData = generateEnhancedOrdersData(data);
    chartInstances.orders = new Chart(ordersCtx, {
        type: 'bar',
        data: {
            labels: ordersData.labels,
            datasets: [{
                label: 'Orders',
                data: ordersData.values,
                backgroundColor: ordersData.colors,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const trend = ordersData.trends[context.dataIndex];
                            return `Trend: ${trend}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Payment Methods Chart
    const paymentCtx = document.getElementById('paymentChart').getContext('2d');
    const paymentData = generateEnhancedPaymentData(data);
    chartInstances.payment = new Chart(paymentCtx, {
        type: 'pie',
        data: {
            labels: paymentData.labels,
            datasets: [{
                data: paymentData.values,
                backgroundColor: [
                    '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6',
                    '#1abc9c', '#34495e', '#e67e22', '#95a5a6', '#16a085'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 10,
                        generateLabels: function(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.labels.map((label, i) => {
                                    const value = data.datasets[0].data[i];
                                    const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    const avgAmount = paymentData.avgAmounts[i];
                                    return {
                                        text: `${label} (${percentage}% - ₹${avgAmount})`,
                                        fillStyle: data.datasets[0].backgroundColor[i],
                                        strokeStyle: data.datasets[0].backgroundColor[i],
                                        lineWidth: 0,
                                        hidden: false,
                                        index: i
                                    };
                                });
                            }
                            return [];
                        }
                    }
                }
            }
        }
    });

    // Customer Segmentation Chart
    const customerCtx = document.getElementById('customerChart').getContext('2d');
    const customerData = generateCustomerSegmentationData(data);
    chartInstances.customer = new Chart(customerCtx, {
        type: 'radar',
        data: {
            labels: customerData.labels,
            datasets: [{
                label: 'Customer Segments',
                data: customerData.values,
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: '#667eea',
                borderWidth: 2,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#667eea'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: Math.max(...customerData.values) * 1.2,
                    ticks: {
                        stepSize: Math.max(...customerData.values) / 5
                    }
                }
            }
        }
    });

    // Geographic Distribution Chart
    const geographicCtx = document.getElementById('geographicChart').getContext('2d');
    const geographicData = generateGeographicData(data);
    chartInstances.geographic = new Chart(geographicCtx, {
        type: 'bar',
        data: {
            labels: geographicData.labels,
            datasets: [{
                label: 'Orders by Area',
                data: geographicData.values,
                backgroundColor: geographicData.colors,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${value} orders (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Generate geographic distribution data
function generateGeographicData(data) {
    const areaStats = {};
    
    data.forEach(item => {
        const area = item.Delivery_Area;
        if (!areaStats[area]) {
            areaStats[area] = { count: 0, totalValue: 0 };
        }
        areaStats[area].count++;
        areaStats[area].totalValue += parseFloat(item.Price || item.Order_Value || 0);
    });

    const sortedAreas = Object.entries(areaStats)
        .sort(([,a], [,b]) => b.count - a.count);

    const colors = [
        '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#ff9a9e'
    ];

    return {
        labels: sortedAreas.map(([area]) => area),
        values: sortedAreas.map(([,stats]) => stats.count),
        colors: sortedAreas.map((_, index) => colors[index % colors.length])
    };
}

// Generate enhanced revenue data with moving average
function generateEnhancedRevenueData(data) {
    const dailyRevenue = {};
    
    data.forEach(item => {
        const date = item.Date;
        const value = parseFloat(item.Price || item.Order_Value || 0);
        dailyRevenue[date] = (dailyRevenue[date] || 0) + value;
    });

    const sortedDates = Object.keys(dailyRevenue).sort();
    const last7Days = sortedDates.slice(-7);
    const values = last7Days.map(date => dailyRevenue[date]);
    
    // Calculate 7-day moving average
    const movingAverage = [];
    for (let i = 0; i < values.length; i++) {
        const start = Math.max(0, i - 6);
        const end = i + 1;
        const avg = values.slice(start, end).reduce((a, b) => a + b, 0) / (end - start);
        movingAverage.push(avg);
    }

    return {
        labels: last7Days.map(date => {
            const d = new Date(date);
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }),
        values: values,
        movingAverage: movingAverage
    };
}

// Generate enhanced category data with performance metrics
function generateEnhancedCategoryData(data, category) {
    const categoryStats = {};
    
    data.forEach(item => {
        let categoryName = '';
        let value = parseFloat(item.Price || item.Order_Value || 0);
        
        switch(category) {
            case 'food-delivery':
                categoryName = item.Cuisine_Type || 'Unknown';
                break;
            case 'clothing':
                categoryName = item.Category || 'Unknown';
                break;
            case 'electronics':
                categoryName = item.Category || 'Unknown';
                break;
            case 'books':
                categoryName = item.Category || 'Unknown';
                break;
            case 'automotive':
                categoryName = item.Category || 'Unknown';
                break;
            case 'healthcare':
                categoryName = item.Specialty || 'Unknown';
                break;
        }
        
        if (!categoryStats[categoryName]) {
            categoryStats[categoryName] = { count: 0, totalValue: 0 };
        }
        categoryStats[categoryName].count++;
        categoryStats[categoryName].totalValue += value;
    });

    // Sort by total value and take top 8
    const sortedCategories = Object.entries(categoryStats)
        .sort(([,a], [,b]) => b.totalValue - a.totalValue)
        .slice(0, 8);

    return {
        labels: sortedCategories.map(([name]) => name),
        values: sortedCategories.map(([,stats]) => stats.count)
    };
}

// Generate enhanced orders data with trend analysis
function generateEnhancedOrdersData(data) {
    const dailyOrders = {};
    
    data.forEach(item => {
        const date = item.Date;
        dailyOrders[date] = (dailyOrders[date] || 0) + 1;
    });

    const sortedDates = Object.keys(dailyOrders).sort();
    const last7Days = sortedDates.slice(-7);
    const values = last7Days.map(date => dailyOrders[date]);
    
    // Calculate trends and colors
    const colors = values.map((value, index) => {
        if (index === 0) return '#27ae60';
        const prevValue = values[index - 1];
        if (value > prevValue) return '#27ae60'; // Green for increase
        if (value < prevValue) return '#e74c3c'; // Red for decrease
        return '#f39c12'; // Orange for no change
    });
    
    const trends = values.map((value, index) => {
        if (index === 0) return 'Baseline';
        const prevValue = values[index - 1];
        const change = value - prevValue;
        if (change > 0) return `+${change} orders`;
        if (change < 0) return `${change} orders`;
        return 'No change';
    });

    return {
        labels: last7Days.map(date => {
            const d = new Date(date);
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }),
        values: values,
        colors: colors,
        trends: trends
    };
}

// Generate enhanced payment data with average amounts
function generateEnhancedPaymentData(data) {
    const paymentStats = {};
    
    data.forEach(item => {
        const method = item.Payment_Method;
        const value = parseFloat(item.Price || item.Order_Value || 0);
        
        if (!paymentStats[method]) {
            paymentStats[method] = { count: 0, totalValue: 0 };
        }
        paymentStats[method].count++;
        paymentStats[method].totalValue += value;
    });

    const sortedMethods = Object.entries(paymentStats)
        .sort(([,a], [,b]) => b.count - a.count);

    return {
        labels: sortedMethods.map(([method]) => method),
        values: sortedMethods.map(([,stats]) => stats.count),
        avgAmounts: sortedMethods.map(([,stats]) => Math.round(stats.totalValue / stats.count))
    };
}

// Generate customer segmentation data
function generateCustomerSegmentationData(data) {
    const customerStats = {};
    
    data.forEach(item => {
        const customerId = item.Customer_ID;
        const value = parseFloat(item.Price || item.Order_Value || 0);
        
        if (!customerStats[customerId]) {
            customerStats[customerId] = { count: 0, totalValue: 0 };
        }
        customerStats[customerId].count++;
        customerStats[customerId].totalValue += value;
    });

    // Calculate customer segments
    const customers = Object.values(customerStats);
    const totalCustomers = customers.length;
    const avgOrderValue = customers.reduce((sum, c) => sum + c.totalValue, 0) / totalCustomers;
    const avgOrderCount = customers.reduce((sum, c) => sum + c.count, 0) / totalCustomers;

    // Segment customers
    const highValue = customers.filter(c => c.totalValue > avgOrderValue * 1.5).length;
    const frequent = customers.filter(c => c.count > avgOrderCount * 1.5).length;
    const newCustomers = customers.filter(c => c.count === 1).length;
    const loyal = customers.filter(c => c.count > 3 && c.totalValue > avgOrderValue).length;
    const average = customers.filter(c => 
        c.totalValue <= avgOrderValue * 1.5 && 
        c.count <= avgOrderCount * 1.5 &&
        c.count > 1
    ).length;

    return {
        labels: ['High Value', 'Frequent', 'New', 'Loyal', 'Average'],
        values: [highValue, frequent, newCustomers, loyal, average]
    };
}

// Generate advanced insights
function generateAdvancedInsights(data, category) {
    const insightsContainer = document.getElementById('advancedInsights');
    
    // Calculate key metrics
    const totalRevenue = data.reduce((sum, item) => sum + parseFloat(item.Price || item.Order_Value || 0), 0);
    const totalOrders = data.length;
    const uniqueCustomers = new Set(data.map(item => item.Customer_ID)).size;
    const avgOrderValue = totalRevenue / totalOrders;
    
    // Calculate growth metrics
    const sortedData = data.sort((a, b) => new Date(a.Date) - new Date(b.Date));
    const firstHalf = sortedData.slice(0, Math.floor(sortedData.length / 2));
    const secondHalf = sortedData.slice(Math.floor(sortedData.length / 2));
    
    const firstHalfRevenue = firstHalf.reduce((sum, item) => sum + parseFloat(item.Price || item.Order_Value || 0), 0);
    const secondHalfRevenue = secondHalf.reduce((sum, item) => sum + parseFloat(item.Price || item.Order_Value || 0), 0);
    const revenueGrowth = ((secondHalfRevenue - firstHalfRevenue) / firstHalfRevenue * 100).toFixed(1);
    
    // Calculate customer retention
    const customerOrderCounts = {};
    data.forEach(item => {
        customerOrderCounts[item.Customer_ID] = (customerOrderCounts[item.Customer_ID] || 0) + 1;
    });
    const repeatCustomers = Object.values(customerOrderCounts).filter(count => count > 1).length;
    const retentionRate = ((repeatCustomers / uniqueCustomers) * 100).toFixed(1);
    
    // Generate insights HTML
    insightsContainer.innerHTML = `
        <div class="insights-grid">
            <div class="insight-card">
                <h3>📈 Performance Metrics</h3>
                <div class="metric">
                    <span class="label">Total Revenue:</span>
                    <span class="value">₹${totalRevenue.toLocaleString()}</span>
                </div>
                <div class="metric">
                    <span class="label">Average Order Value:</span>
                    <span class="value">₹${avgOrderValue.toFixed(2)}</span>
                </div>
                <div class="metric">
                    <span class="label">Revenue Growth:</span>
                    <span class="value ${revenueGrowth > 0 ? 'positive' : 'negative'}">${revenueGrowth}%</span>
                </div>
            </div>
            
            <div class="insight-card">
                <h3>👥 Customer Insights</h3>
                <div class="metric">
                    <span class="label">Unique Customers:</span>
                    <span class="value">${uniqueCustomers}</span>
                </div>
                <div class="metric">
                    <span class="label">Customer Retention:</span>
                    <span class="value">${retentionRate}%</span>
                </div>
                <div class="metric">
                    <span class="label">Repeat Customers:</span>
                    <span class="value">${repeatCustomers}</span>
                </div>
            </div>
            
            <div class="insight-card">
                <h3>🎯 Recommendations</h3>
                <ul class="recommendations">
                    ${generateRecommendations(data, category, avgOrderValue, retentionRate)}
                </ul>
            </div>
            
            <div class="insight-card">
                <h3>📊 Trend Analysis</h3>
                <div class="trend-analysis">
                    ${generateTrendAnalysis(data, category)}
                </div>
            </div>
        </div>
    `;
}

// Generate recommendations based on data
function generateRecommendations(data, category, avgOrderValue, retentionRate) {
    const recommendations = [];
    
    // Analyze payment methods
    const paymentMethods = {};
    data.forEach(item => {
        const method = item.Payment_Method;
        paymentMethods[method] = (paymentMethods[method] || 0) + 1;
    });
    const topPaymentMethod = Object.entries(paymentMethods).sort(([,a], [,b]) => b - a)[0][0];
    
    // Analyze peak times (for food delivery)
    if (category === 'food-delivery') {
        const orderTimes = data.map(item => parseInt(item.Order_Time?.split(':')[0]) || 12);
        const peakHour = orderTimes.reduce((acc, hour) => {
            acc[hour] = (acc[hour] || 0) + 1;
            return acc;
        }, {});
        const busiestHour = Object.entries(peakHour).sort(([,a], [,b]) => b - a)[0][0];
        
        recommendations.push(`Peak ordering time is ${busiestHour}:00 - consider promotions during off-peak hours`);
    }
    
    // General recommendations
    if (retentionRate < 30) {
        recommendations.push('Focus on customer retention strategies - current rate is low');
    }
    
    if (avgOrderValue < 500) {
        recommendations.push('Consider upselling strategies to increase average order value');
    }
    
    recommendations.push(`Most popular payment method is ${topPaymentMethod} - optimize for this method`);
    
    // Category-specific recommendations
    switch(category) {
        case 'food-delivery':
            recommendations.push('Consider delivery time optimization for better customer satisfaction');
            break;
        case 'clothing':
            recommendations.push('Implement size recommendation system to reduce returns');
            break;
        case 'electronics':
            recommendations.push('Focus on warranty and after-sales service promotion');
            break;
        case 'books':
            recommendations.push('Create reading lists and personalized recommendations');
            break;
        case 'automotive':
            recommendations.push('Highlight financing options and maintenance packages');
            break;
        case 'healthcare':
            recommendations.push('Emphasize appointment booking and emergency services');
            break;
    }
    
    return recommendations.map(rec => `<li>${rec}</li>`).join('');
}

// Generate trend analysis
function generateTrendAnalysis(data, category) {
    const trends = [];
    
    // Analyze daily trends
    const dailyData = {};
    data.forEach(item => {
        const date = item.Date;
        if (!dailyData[date]) {
            dailyData[date] = { orders: 0, revenue: 0 };
        }
        dailyData[date].orders++;
        dailyData[date].revenue += parseFloat(item.Price || item.Order_Value || 0);
    });
    
    const sortedDates = Object.keys(dailyData).sort();
    const recentDays = sortedDates.slice(-3);
    const previousDays = sortedDates.slice(-6, -3);
    
    if (recentDays.length >= 3 && previousDays.length >= 3) {
        const recentAvgOrders = recentDays.reduce((sum, date) => sum + dailyData[date].orders, 0) / 3;
        const previousAvgOrders = previousDays.reduce((sum, date) => sum + dailyData[date].orders, 0) / 3;
        const orderTrend = ((recentAvgOrders - previousAvgOrders) / previousAvgOrders * 100).toFixed(1);
        
        const recentAvgRevenue = recentDays.reduce((sum, date) => sum + dailyData[date].revenue, 0) / 3;
        const previousAvgRevenue = previousDays.reduce((sum, date) => sum + dailyData[date].revenue, 0) / 3;
        const revenueTrend = ((recentAvgRevenue - previousAvgRevenue) / previousAvgRevenue * 100).toFixed(1);
        
        trends.push(`<div class="trend-item">
            <span class="trend-label">Order Volume:</span>
            <span class="trend-value ${orderTrend > 0 ? 'positive' : 'negative'}">${orderTrend}%</span>
        </div>`);
        
        trends.push(`<div class="trend-item">
            <span class="trend-label">Revenue:</span>
            <span class="trend-value ${revenueTrend > 0 ? 'positive' : 'negative'}">${revenueTrend}%</span>
        </div>`);
    }
    
    // Analyze customer behavior
    const customerOrderCounts = {};
    data.forEach(item => {
        customerOrderCounts[item.Customer_ID] = (customerOrderCounts[item.Customer_ID] || 0) + 1;
    });
    
    const singleOrderCustomers = Object.values(customerOrderCounts).filter(count => count === 1).length;
    const multiOrderCustomers = Object.values(customerOrderCounts).filter(count => count > 1).length;
    
    if (singleOrderCustomers > multiOrderCustomers) {
        trends.push(`<div class="trend-item">
            <span class="trend-label">Customer Behavior:</span>
            <span class="trend-value negative">High one-time customers</span>
        </div>`);
    } else {
        trends.push(`<div class="trend-item">
            <span class="trend-label">Customer Behavior:</span>
            <span class="trend-value positive">Good repeat business</span>
        </div>`);
    }
    
    return trends.join('');
} 