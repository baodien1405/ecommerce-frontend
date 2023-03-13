# Project Tiki Clone Typescript

## Main feature in project

- Authentication module: Manage by JWT

  - Sign up
  - Sign in
  - Sign out

- Product List Page

  - Pagination
  - Sort by fields of product
  - filter by fields of product
  - Search products

- Admin System Page (only access when role is admin)

  - Admin User Page
    - CRUD user
    - Pagination
    - Soft delete
    
  - Admin Product List
    - CRUD product
    - Pagination
    - Export excel file

- Product Detail Page:

  - Show detail product info
  - Show image like slider + hover zooom effect
  - Desc is displayed rick text like WYSIWYG HTML
  - Buy product feature

- Cart

  - Order management: CRUD product
  - Buy product

- Customer profile management

  - Update personal info
  - Upload Avatar
  - Change password
  - View status of orders

## Technical Stack

- UI / CSS Library: Tailwindcss + Ant Design
- State Management: React Query (server state) and React Context (local state)
- Form Management: React Hook Form
- Validation: yup
- Router: React Router Dom
- Build tool: Vite
- API: Rest API of repo tiki-clone-backend
- Support muti languages with react.i18next
- Support SEO with React Helmet
- Modaling component with story book
- Unit Test
- More...
