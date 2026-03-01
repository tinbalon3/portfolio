# UI Libraries

Guidelines for shadcn/ui and Ant Design in React applications.

---

## shadcn/ui

A collection of reusable, accessible components built with Radix UI and Tailwind CSS. Components are copied into your project for full customization.

### Installation

```bash
# Initialize shadcn/ui
npx shadcn@latest init

# Add components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add table
```

### Component Usage

```tsx
// Button
import { Button } from '@/shared/ui/button';

<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Delete</Button>

<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><IconComponent /></Button>

// With loading state
<Button disabled={isLoading}>
  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  Submit
</Button>
```

```tsx
// Card
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

```tsx
// Dialog (Modal)
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description here.</DialogDescription>
    </DialogHeader>
    <div className="py-4">
      {/* Dialog body content */}
    </div>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

```tsx
// Form with React Hook Form + Zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
});

export const ProfileForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>Your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
```

```tsx
// Data Table
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map((user) => (
      <TableRow key={user.id}>
        <TableCell className="font-medium">{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="sm">Edit</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Customization

Components live in `src/shared/ui/` - modify directly:

```tsx
// shared/ui/button.tsx - customize variants
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium...',
  {
    variants: {
      variant: {
        // Add custom variant
        brand: 'bg-brand-500 text-white hover:bg-brand-600',
      },
    },
  }
);
```

---

## Ant Design

Enterprise-grade UI library with comprehensive components.

### Installation

```bash
npm install antd @ant-design/icons
```

### Configuration

```tsx
// app/providers/antd-provider.tsx
import { ConfigProvider, theme } from 'antd';

export const AntdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
        algorithm: theme.defaultAlgorithm, // or theme.darkAlgorithm
      }}
    >
      {children}
    </ConfigProvider>
  );
};
```

### Component Usage

```tsx
// Button
import { Button, Space } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';

<Space>
  <Button type="primary">Primary</Button>
  <Button>Default</Button>
  <Button type="dashed">Dashed</Button>
  <Button type="text">Text</Button>
  <Button type="link">Link</Button>
  <Button danger>Danger</Button>
</Space>

<Button type="primary" icon={<SearchOutlined />}>
  Search
</Button>

<Button type="primary" loading={isLoading}>
  Submit
</Button>
```

```tsx
// Form
import { Form, Input, Button, Select, DatePicker } from 'antd';

interface FormValues {
  username: string;
  email: string;
  role: string;
}

export const UserForm: React.FC = () => {
  const [form] = Form.useForm<FormValues>();

  const onFinish = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ role: 'user' }}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: 'Please enter username' }]}
      >
        <Input placeholder="Enter username" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please enter email' },
          { type: 'email', message: 'Please enter valid email' },
        ]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>

      <Form.Item name="role" label="Role">
        <Select>
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="user">User</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
```

```tsx
// Table
import { Table, Tag, Space, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

const columns: ColumnsType<User> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'active' ? 'green' : 'red'}>
        {status.toUpperCase()}
      </Tag>
    ),
    filters: [
      { text: 'Active', value: 'active' },
      { text: 'Inactive', value: 'inactive' },
    ],
    onFilter: (value, record) => record.status === value,
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <Space>
        <Button type="link" size="small">Edit</Button>
        <Button type="link" size="small" danger>Delete</Button>
      </Space>
    ),
  },
];

export const UserTable: React.FC<{ data: User[] }> = ({ data }) => (
  <Table
    columns={columns}
    dataSource={data}
    rowKey="id"
    pagination={{ pageSize: 10 }}
  />
);
```

```tsx
// Modal
import { Modal, Button } from 'antd';
import { useState } from 'react';

export const ConfirmModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    await performAction();
    setConfirmLoading(false);
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        title="Confirm Action"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
      >
        <p>Are you sure you want to perform this action?</p>
      </Modal>
    </>
  );
};

// Simpler: use Modal.confirm()
const showDeleteConfirm = () => {
  Modal.confirm({
    title: 'Delete Item',
    content: 'Are you sure you want to delete this item?',
    okText: 'Delete',
    okType: 'danger',
    cancelText: 'Cancel',
    onOk: async () => {
      await deleteItem();
    },
  });
};
```

```tsx
// Message & Notification
import { message, notification, Button } from 'antd';

// Toast messages
message.success('Operation successful');
message.error('Operation failed');
message.warning('Warning message');
message.loading('Loading...', 2); // 2 seconds

// Notifications
notification.success({
  message: 'Success',
  description: 'Your changes have been saved.',
});

notification.error({
  message: 'Error',
  description: 'Something went wrong. Please try again.',
});
```

### Theme Customization

```tsx
// Comprehensive theme config
<ConfigProvider
  theme={{
    token: {
      // Colors
      colorPrimary: '#1890ff',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#ff4d4f',
      colorInfo: '#1890ff',
      
      // Typography
      fontFamily: 'Inter, sans-serif',
      fontSize: 14,
      
      // Borders
      borderRadius: 6,
      
      // Spacing
      padding: 16,
      margin: 16,
    },
    components: {
      Button: {
        colorPrimary: '#1890ff',
        algorithm: true,
      },
      Input: {
        colorBorder: '#d9d9d9',
      },
    },
  }}
>
```

---

## When to Use Each

### Choose shadcn/ui When:
- Building custom design systems
- Need full control over component code
- Using Tailwind CSS
- Want accessible, minimal components
- Building modern, minimal UIs

### Choose Ant Design When:
- Building enterprise/admin applications
- Need comprehensive component set
- Need complex data tables
- Need form validation built-in
- Want consistent design language out-of-box

### Mixing Both

You can use both in the same project:

```tsx
// Use shadcn/ui for custom UI elements
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';

// Use Ant Design for complex components
import { Table, Form, DatePicker } from 'antd';
```

---

## FSD Organization

```
shared/
└── ui/
    ├── button.tsx        # shadcn/ui button
    ├── card.tsx          # shadcn/ui card
    ├── dialog.tsx        # shadcn/ui dialog
    ├── form.tsx          # shadcn/ui form
    ├── input.tsx         # shadcn/ui input
    └── antd/
        ├── table.tsx     # Ant Design table wrapper
        └── form.tsx      # Ant Design form wrapper
```

---

## UI Library Checklist

**shadcn/ui:**
- [ ] Initialize with `npx shadcn@latest init`
- [ ] Add needed components
- [ ] Configure theme in CSS variables
- [ ] Customize variants as needed

**Ant Design:**
- [ ] Install `antd` and `@ant-design/icons`
- [ ] Configure `ConfigProvider` with theme
- [ ] Set up dark mode support
- [ ] Import components individually (tree-shaking)

