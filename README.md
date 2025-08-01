# Formluu - Drag & Drop Form Builder

A modern, intuitive form builder built with Next.js, TypeScript, and Tailwind CSS. Create beautiful forms with ease using a drag-and-drop interface similar to Tally.so.

## Features

- **Drag & Drop Interface**: Intuitive form building with React DnD
- **Multiple Field Types**: Support for Short Text, Long Text, Email, Number, Checkbox, Radio, Dropdown, and NPS fields
- **Real-time Configuration**: Configure field properties in the right panel
- **Live Preview**: Preview your form as it will appear to users
- **Responsive Design**: Clean, modern UI built with Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## Field Types Supported

- **Short Text**: Single-line text input
- **Long Text**: Multi-line textarea
- **Email**: Email input with validation
- **Number**: Numeric input with min/max values
- **Checkbox**: Single checkbox option
- **Radio**: Multiple choice radio buttons
- **Dropdown**: Select dropdown with custom options
- **NPS**: Net Promoter Score with customizable range

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd formluu
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Building a Form

1. **Add Fields**: Drag form elements from the left panel to the canvas
2. **Configure Fields**: Click on any field to configure its properties in the right panel
3. **Preview Form**: Click the "Preview Form" button to see how your form will look
4. **Remove Fields**: Hover over fields and click the × button to remove them

### Field Configuration

Each field can be configured with:
- **Label**: The field's display name
- **Placeholder**: Helper text shown in the input
- **Help Text**: Additional guidance for users
- **Required**: Toggle to make the field mandatory
- **Options**: For radio/dropdown fields, manage the available choices
- **Min/Max Values**: For number/NPS fields, set value ranges

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main page component
│   └── layout.tsx         # Root layout
├── components/
│   └── form-builder/      # Form builder components
│       ├── form-builder.tsx    # Main orchestrator
│       ├── fields-panel.tsx    # Left panel with draggable fields
│       ├── form-canvas.tsx     # Middle canvas for form building
│       ├── config-panel.tsx    # Right panel for field configuration
│       ├── form-field.tsx      # Individual field component
│       ├── preview-modal.tsx   # Form preview modal
│       └── available-fields.ts # Field type definitions
├── types/
│   └── form.ts            # TypeScript type definitions
└── hooks/                 # Custom React hooks (future use)
```

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React DnD**: Drag and drop functionality
- **React**: UI library

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Field Types

1. Add the field type to the `FieldType` union in `src/types/form.ts`
2. Add field configuration to `AVAILABLE_FIELDS` in `src/components/form-builder/available-fields.ts`
3. Implement rendering logic in `src/components/form-builder/form-field.tsx`
4. Add configuration options in `src/components/form-builder/config-panel.tsx`

## Future Enhancements

- [ ] Form templates and presets
- [ ] Export forms as JSON/HTML
- [ ] Form validation rules
- [ ] Conditional logic between fields
- [ ] File upload fields
- [ ] Date/time picker fields
- [ ] Form submission handling
- [ ] User authentication
- [ ] Form analytics and responses

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
