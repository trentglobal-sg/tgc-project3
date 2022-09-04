# Merinology
![alt=mock up](src/images/mockup.png)

The live demo of the main customer website can be accessed [here](https://tgc-ec-merinology-react.netlify.app/)

The live demo of the admin website can be accessed [here](https://tgc-ec-merinology.herokuapp.com/)

The github for the Express application can be accessed [here](https://github.com/Koihcire/tgc-project3-api)

## 1. Project Summary
<hr>
Merinology is a an web based e-commerce application that aims to bring together the best merino wool products from quality brands. This platform is targeted at travellers and outdoor enthusiasts who are most concerned with the functional and performance aspects from having quality fabric material, over current fashion trends.

## 2. UI UX
<hr>

### 2.1 Strategy
To create a platform where merinology curates the best quality merino wool products most suitable for a moderate climate such as asia. Users will be able to shop from suppliers in different parts of the world without having to worry about raking up separate shipping fees.

#### Organisation Objective

#### User Story
<table>
    <tr>
        <th>User Stories</th>
        <th>Acceptance Criteria</th>
    </tr>
    <tr>
        <td>I would like to be able to browse different brands of merino wool products without needing to google search between different websites</td>
        <td>Merinology needs to carry reputable brands who specialise in merino wool products and allow users to search by brands and type of apparal (eg. shirts, bottoms etc)</td>
    </tr>
    <tr>
        <td>I would like to buy a merino wool shirt for hiking</td>
        <td>Products need to be categorised according to type of activity it is suitable for. In addition, the thickness of the merino wool yarn should also be displayed with suggestions of suitability for different climates</td>
    </tr>
    <tr>
        <td>I would like to know what is so special about merino wool compared to other fabrics that warrants its high price</td>
        <td>There should be a section dedicated to the benefits of merino wool easily accessible as a call to action from the landing page, and always one click away from any page in the website</td>
    </tr>
    <tr>
        <td>I am interested in merino wool products but am concerned about the durability of the fabric as I heard that merino wool clothing tears easily</td>
        <td>The material blend should be displayed on the product page clearly for the user to see. In addition, user should able to search for products by material blend</td>
    </tr>
    <tr>
        <td>As these products are expensive, I need sometime to think and reconsider my purchase</td>
        <td>User should be able to add to cart, log out, and their cart should remain the next time they log in again</td>
    </tr>
    <tr>
        <td>I want to be able to check on the status of my order</td>
        <td>User should be able to see their orders and its status its updated date. Admin and staff users should be able to update the order status on the admin panel</td>
    </tr>
</table>

### 2.2 Scope

#### Features
As per user stories above

### 2.3 Database and Website Architecture

#### Database

[Click to view logical schema](src/images/logical-schema.png)

#### Website

[Click to view website architecture](src/images/project3-sitemap.pdf)

### 2.4 UI Skeleton

[Click to view UI wireframe](src/images/project3-wireframe.pdf)

### 2.5 Surface

#### Colors
![color scheme](src/images/color-scheme.png)

The color chosen is in a greyscale palette in line with a minimalist look and feel. Merino wool apparel are often in natural wool colors in greyscale tones as it is often not ideal to dye the fabric without affecting its natural anti bacterial properties.

#### Fonts
Vanillate font is chosen for the company logo for its clean, bold cursive for a casual, stylish and clean look.

HurmeGeometric font 3 is chosen for the website body for its versatility and suitability for fashion e-commerce websites.

#### Icons
All interface icons are taken from Bootstrap Icons. See credits.

## 3. Features
<hr>

### Key Features

#### Backend
<table>
    <tr>
        <th>Features</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Registration, Login, Logout</td>
        <td>Only admin and staff can access the admin panel via their respective credentials. Only admin has permission to view and add new staff accounts</t>
    </tr>
    <tr>
        <td>Manage products</td>
        <td>Search for products and create, update and delete product details, color variant details and size product variant stock details</td>
    </tr>
    <tr>
        <td>Manage orders</td>
        <td>Search for orders and update order status details</td>
    </tr>
</table>

#### Frontend
<table>
    <tr>
        <th>Features</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Registration, Login, Logout</td>
        <td>Customers should be able to register for an account using a unique email address and login and log out of their account</t>
    </tr>
    <tr>
        <td>Search for products</td>
        <td>Customers can search for products according to category, brand, activity, blend and product name</td>
    </tr>
    <tr>
        <td>Size selection</td>
        <td>At the product page, customers can select the color variant of their choice to see the size variants available for each color. Size options should be disabled in the event of no stock and a 'limited quantity' warning will be displayed in the event of low stock.</td>
    </tr>
    <tr>
        <td>Cart management</td>
        <td>Customers will be prompted to log in or register when adding a product to cart, if they had not already done so. If prompted, customer will be returned to the last viewed product after logging in. Cart item quantity can also be updated or delete at the cart page. Only logged in customers will be able to view their cart items.</td>
    </tr>
    <tr>
        <td>Cart checkout</td>
        <td>Customers will be able to checkout their cart and make payment via Stripe</td>
    </tr>
    <tr>
        <td>View order</td>
        <td>Upon successful checkout, customers will be redirected back to their orders page where they can view all orders ordered by recency. Order status and receipt information should be displayed.</td>
    </tr>
</table>

### Limitations and Future Implementations
<table>
    <tr>
        <th>No.</th>
        <th>Limitations</th>
        <th>Future Implementations</th>
    </tr>
    <tr>
        <td>1</td>
        <td>All users are currently not able to change their passwords</td>
        <td>Create a profile page to allow all users to change their email and passwords. In addition, admin user should be able to reset accounts for staff users</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Product search at the landing page is currently loaded from the express backend with no pagination</td>
        <td>Implement pagination feature in Express to allow for faster api calls when more products are added</td>
    </tr>
    <tr>
        <td>3</td>
        <td>There are no suggestions made to customers who may be new to merino wool products</td>
        <td>Implement a suggested products carousel on front page consisting of best sellers. Implement a 'suggested for you' segment at each product page</td>
    </tr>
</table>

## 4. Test Cases
<hr>

[Click for test cases](https://1drv.ms/x/s!ArFMW1hSgH5_gacWUup7Crrz-ORTaA?e=2lzszq)


## 5. Deployment
<hr>

The express server is deployed using Heroku

The website is manually deployed using Netlify

## 6. Technologies Used
<hr>

### Backend
<table>
    <tr>
        <th>Technology</th>
        <th>Uses</th>
    </tr>
    <tr>
        <td>Express</td>
        <td>Web application framework used</td>
    </tr>
    <tr>
        <td>Bookshelf.js</td>
        <td>Javascript ORM used for querying SQL databases</td>
    </tr>
    <tr>
        <td>knex</td>
        <td>Query builder for PostgreSQL, MySQL</td>
    </tr>
    <tr>
        <td>db-migrate</td>
        <td>Database migration framework</td>
    </tr>
    <tr>
        <td>Axios</td>
        <td>HTTP client</td>
    </tr>
    <tr>
        <td>Caolan forms</td>
        <td>Create and validate forms</td>
    </tr>
    <tr>
        <td>CORS</td>
        <td>Middleware to enable Cross-Origin Resource Sharing(CORS)</td>
    </tr>
    <tr>
        <td>csurf</td>
        <td>CSRF protection middleware</td>
    </tr>
    <tr>
        <td>dotenv</td>
        <td>To allow loading of environment variables from .env file</td>
    </tr>
    <tr>
        <td>express-sessions</td>
        <td>Session management middleware</td>
    </tr>
    <tr>
        <td>connect-flash</td>
        <td>Middleware to enable flash messages</td>
    </tr>
    <tr>
        <td>express-flash</td>
        <td>Extension of connect-flash to enable definition and rendering of flash messages without redirecting request</td>
    </tr>
    <tr>
        <td>JSON Web Token</td>
        <td>Authentication framework with React app</td>
    </tr>
    <tr>
        <td>Handlebars</td>
        <td>HTML templates for admin panel</td>
    </tr>
    <tr>
        <td>handlebars-helpers</td>
        <td>Handlebar-helpers</td>
    </tr>
    <tr>
        <td>wax-on</td>
        <td>Add support to Handlebars for template inheritance with block and extend helpers</td>
    </tr>
    <tr>
        <td>Cloudinary</td>
        <td>Image hosting service used for upload and storage of images</td>
    </tr>
</table>

### Frontend
<table>
    <tr>
        <th>Technology</th>
        <th>Uses</th>
    </tr>
    <tr>
        <td>React</td>
        <td>Frontend framework</td>
    </tr>
    <tr>
        <td>React router dom</td>
        <td>Handle routing in React web application</td>
    </tr>
    <tr>
        <td>Axios</td>
        <td>HTTP client</td>
    </tr>
    <tr>
        <td>React Bootstrap</td>
        <td>Bootstrap for react client</td>
    </tr><tr>
        <td>Bootstrap</td>
        <td>User for styling of web application</td>
    </tr><tr>
        <td>Stripe</td>
        <td>Pyament gateway used in web application</td>
    </tr>
</table>

## 7. Credits
Interface icons from [Bootstrap icons](https://icons.getbootstrap.com/)

Color paletter from [Muzli](https://colors.muz.li/palette/e8f5fd/d0ecfb/a4b5da/4a6eb5/283c63)

Responsive device mockups from [Create Mockup](https://www.createmockup.com/generate/)

HurmeGeometric font taken from [bestfonts](https://en.bestfonts.pro/font/hurme-geometric-sans-no.3)

Vanillate font taken from [fontspace](https://www.fontspace.com/vanillate-font-f30107)

Stripe.js component is adapted from [Jerrysuper123](https://github.com/Jerrysuper123/artisanBread)

mySQL template for express application is from [kunxin-chor](https://github.com/kunxin-chor/mysql-base)

Product images taken from [Ridge Merino](https://www.ridgemerino.com/), [Wool & Prince](https://woolandprince.com/), [IceBreaker Merino](https://www.icebreaker.com/en-us/home)

Loading skeleton taken from [React-loading-skeleton](https://www.npmjs.com/package/react-loading-skeleton)






