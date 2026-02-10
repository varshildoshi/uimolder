# Specification: LayoutBuilder Component

## Overview
The `LayoutBuilder` component is a comprehensive, drag-and-drop UI builder designed to supersede previous "Forge Builder" iterations. It aims to provide a robust environment for creating complex web layouts using a wide array of configurable elements (from basic inputs to advanced layout containers like cards and dashboards). Key features include deep property configuration for each element and the ability to export the designed layout in multiple code "flavors" (Simple HTML, Tailwind CSS v4, and Angular Material).

## Core Requirements

### 1. Drag & Drop Engine
- **Technology:** Angular CDK (`@angular/cdk/drag-drop`).
- **Functionality:**
    -   **Toolbox:** A sidebar containing draggable templates for all supported UI elements.
    -   **Canvas:** A drop zone where users can place and reorder elements.
    -   **Nested Layouts:** Support for dropping elements into layout containers (e.g., Cards, Rows/Grids) to create hierarchical structures.
    -   **Visual Feedback:** Clear indicators for drop zones (placeholders) and active dragging states.

### 2. Component Library (Toolbox)
The toolbox must include a comprehensive set of elements, categorized for ease of use:
-   **Form Elements:** Input (Text), Textarea, Checkbox, Radio Group, Select/Dropdown, Datepicker, Toggle/Switch.
-   **Layout Elements:** Card, Row/Grid (multi-column support), Dashboard Widget Container, Divider, Spacer.
-   **Display Elements:** Heading, Text/Paragraph, Badge, Icon, Button, Button Group.
-   **Advanced Elements:** Modal/Dialog Trigger, Bottom Sheet Trigger, Autocomplete.

### 3. Deep Configuration (Property Panel)
-   **Context-Aware:** Clicking an element on the canvas opens a configuration panel specific to that element type.
-   **Configurable Properties:**
    -   **Common:** Label, ID/Key, CSS Classes, Visibility.
    -   **Inputs:** Placeholder, Required, Pattern (Regex validation), Min/Max length.
    -   **Select/Radio:** Option management (Add/Remove/Edit label & value), Multi-select toggle.
    -   **Layouts:** Column count (for grids), Flex direction, Gap, Padding/Margin.
    -   **Styling:** Text alignment, Color variants (Primary, Accent, Warn, etc., mapping to flavor specifics).

### 4. Multi-Flavor Code Export
-   **Supported Flavors:**
    1.  **Simple HTML:** Clean, semantic HTML5.
    2.  **Tailwind CSS (v4):** Utility-first classes for styling.
    3.  **Angular Material:** Official Angular Material components (`mat-form-field`, `mat-card`, etc.).
-   **Functionality:**
    -   **Live Preview:** Toggle between "Editor" and "Preview" modes.
    -   **Code View:** Real-time generation of code based on the current canvas state and selected flavor.
    -   **Export:** Download the project/layout as a JSON file (for saving state) or the generated code file.

### 5. UI/UX Design
-   **Theme:** Dark mode/High-contrast "Professional" aesthetic (referencing `product-guidelines.md`).
-   **Responsiveness:** The builder interface itself must be usable on standard desktop resolutions.
-   **Performance:** utilize Angular Signals for state management to ensure smooth updates even with complex layouts.

## Technical Architecture
-   **State Management:** Use Angular Signals (`signal`, `computed`) to track the canvas state (`FormRow[]` or recursive `ComponentNode[]`), selected element, and active flavor.
-   **Service Integration:** Integrate with `LayoutService` for global layout settings (header height, etc.).
-   **Modularity:** Create a reusable `PropertyEditor` component to handle the configuration logic, keeping the main builder component clean.

## Acceptance Criteria
-   [ ] User can drag any element from the toolbox to the canvas.
-   [ ] User can reorder elements on the canvas.
-   [ ] User can configure specific properties for each element (e.g., add options to a dropdown).
-   [ ] The "Preview" mode correctly renders the layout using the selected flavor's styling/components.
-   [ ] The "Export" function generates valid code for all three flavors.
-   [ ] The UI matches the "Professional & Modern" design guidelines.
