# Computer Store Checkout System
Welcome to DiUS Computer Store Checkout System! This TypeScript implementation allows you to handle various pricing rules for a variety of products in our store. Whether it's a special deal on Apple TVs, a discount on Super iPads, or a free VGA adapter bundled with MacBook Pro purchases, our checkout system has you covered

# Getting Started
# Prerequisites
Node.js(https://nodejs.org/en) installed on your machine.

# Installation
1. **Clone the repository**:

```bash
git clone https://github.com/your-username/checkout-system.git
```

2. **Navigate to the project directory:**

```bash
cd checkout-system
```

3. **Install dependencies:**
```bash
npm install
```

4. **Run Unit Tests**
```bash
npm run test
```

5. **Run Example Scenarios in local**

      Go to src directory
      ```bash
      cd src
      ```
    
      i. SKUs Scanned: atv, atv, atv, vga Total expected: $249.00
      ```bash
      ts-node index.ts FirstExample
      ```
    
      ii. SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd Total expected: $2718.95
      ```bash
      
      ts-node index.ts SecondExample
      ```
    
      iii. SKUs Scanned: mbp, vga, ipd Total expected: $1949.98
      ```bash
     
      ts-node index.ts ThirdExample
      ```


