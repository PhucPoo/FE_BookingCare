# Tài liệu:
**Slide báo cáo:** "https://www.canva.com/design/DAG16glos0U/kZlgLi06F9AkXpOcljuywQ/edit?utm_content=DAG16glos0U&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
**Tài liệu báo cáo:** "https://humgedu-my.sharepoint.com/:w:/g/personal/2221050679_student_humg_edu_vn/Eddy9UuGVqZEk4qWmFmk_soBlscusrfChmmsdASp0yn_-w?rtime=OgZdCJEN3kg"
**Structure của dự án:**
bookingcare-admin/
│── public/                  # Ảnh, favicon, static files
│── src/
│   ├── assets/              # Ảnh, icons, font...
│   ├── components/          # Các component dùng chung
│   │   ├── Header/
│   │   │   └── Header.jsx
│   │   ├── Sidebar/
│   │   │   └── Sidebar.jsx
│   │   ├── UI/              # Button, Input, Modal (shadcn/ui hoặc custom)
│   │   └── Table/           # Bảng hiển thị danh sách
│   │
│   ├── layouts/             # Layouts (DashboardLayout, AuthLayout...)
│   │   └── DashboardLayout.jsx
│   │
│   ├── pages/               # Các trang (route)
│   │   ├── Dashboard/       
│   │   │   └── Dashboard.jsx
│   │   ├── Accounts/
│   │   │   ├── DoctorList.jsx
│   │   │   ├── AssistantList.jsx
│   │   │   └── UserList.jsx
│   │   ├── Services/
│   │   │   ├── ServiceList.jsx
│   │   │   └── AppointmentList.jsx
│   │   ├── Departments/
│   │   │   └── DepartmentList.jsx
│   │   ├── Invoices/
│   │   │   ├── InvoiceList.jsx
│   │   │   └── InvoiceDetail.jsx
│   │   └── Reports/
│   │       └── ReportOverview.jsx
│   │
│   ├── routes/              # Định nghĩa route chung
│   │   └── AppRoutes.jsx
│   │
│   ├── services/            # API gọi backend
│   │   ├── api.js           # setup axios/fetch baseURL
│   │   ├── accountService.js
│   │   ├── serviceService.js
│   │   ├── invoiceService.js
│   │   └── reportService.js
│   │
│   ├── store/               # Quản lý state (Redux / Zustand / Context API)
│   │   └── authStore.js
│   │
│   ├── hooks/               # Custom hooks (useAuth, useFetch…)
│   │
│   ├── utils/               # Hàm tiện ích (formatDate, formatCurrency…)
│   │
│   ├── App.jsx              # Gốc React (dùng Router + Layout)
│   ├── main.jsx             # Entry point Vite
│   └── index.css            # Tailwind config
│
├── .gitignore
├── package.json
├── tailwind.config.js
└── vite.config.js
