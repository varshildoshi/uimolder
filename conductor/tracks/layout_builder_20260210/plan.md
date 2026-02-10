# Implementation Plan - LayoutBuilder Component

## Phase 1: Core Architecture & Drag-and-Drop Engine
- [x] Task: Set up `LayoutBuilder` Component Structure 44f2a0c
    - [x] Create `layout-builder` component directory and files (`.ts`, `.html`, `.scss`, `.spec.ts`) in `src/app/components/`.
    - [x] Configure routing to access the builder at `/builder`.
    - [x] Implement basic layout shell (Header, Sidebar, Canvas area) matching the design guidelines.
- [x] Task: Implement Signal-based State Management
    - [x] Define interfaces for `ComponentNode`, `CanvasState`, and `Flavor`.
    - [x] Initialize signals for `canvasItems`, `selectedElementId`, `viewMode`, and `activeFlavor`.
- [x] Task: specific Drag & Drop Implementation
    - [x] Import `DragDropModule`.
    - [x] Create the `Toolbox` array with initial basic elements (Input, Button, Card).
    - [x] Implement `cdkDropList` for the Toolbox (source) and Canvas (target).
    - [x] Implement `onDrop` logic to handle adding new items and reordering existing ones.
    - [x] Write tests to verify adding and reordering items.
- [~] Task: Conductor - User Manual Verification 'Core Architecture & Drag-and-Drop Engine' (Protocol in workflow.md)

## Phase 2: Expanded Component Library & Nested Layouts
- [ ] Task: Implement Form Elements
    - [ ] Add `Textarea`, `Checkbox`, `Radio Group`, `Select`, `Datepicker`, `Toggle` to the toolbox.
    - [ ] Create render logic in the canvas for each new element type.
    - [ ] Write tests for rendering each form element.
- [ ] Task: Implement Layout Containers (Recursive)
    - [ ] Add `Card` and `Row/Grid` container elements.
    - [ ] Update `ComponentNode` interface to support `children` property.
    - [ ] Implement recursive rendering logic (e.g., a helper component or `ng-template`) to allow dropping elements *inside* containers.
    - [ ] Write tests for nested element insertion.
- [ ] Task: Implement Display & Advanced Elements
    - [ ] Add `Heading`, `Text`, `Badge`, `Icon`, `Button Group`.
    - [ ] Add `Modal Trigger`, `Bottom Sheet Trigger`, `Autocomplete`.
    - [ ] Write tests for rendering these elements.
- [ ] Task: Conductor - User Manual Verification 'Expanded Component Library & Nested Layouts' (Protocol in workflow.md)

## Phase 3: Deep Configuration (Property Editor)
- [ ] Task: Create PropertyEditor Component
    - [ ] Create a sub-component `property-editor` to handle element configuration.
    - [ ] Implement inputs for common properties (Label, ID, Visibility).
- [ ] Task: Implement Type-Specific Configuration
    - [ ] Add logic to show specific fields based on the selected element type (e.g., "Options" list for Dropdowns, "Placeholder" for Inputs).
    - [ ] Implement "Options Manager" UI for adding/removing/editing dropdown/radio options.
    - [ ] Bind property updates back to the `canvasItems` signal.
    - [ ] Write tests for property updates.
- [ ] Task: Conductor - User Manual Verification 'Deep Configuration (Property Editor)' (Protocol in workflow.md)

## Phase 4: Multi-Flavor Code Generation & Export
- [ ] Task: Implement Code Generation Service/Logic
    - [ ] Create a utility or service to traverse the `canvasItems` tree and generate string output.
    - [ ] Implement `HTML` generator strategy.
    - [ ] Implement `Tailwind CSS` generator strategy (mapping internal props to utility classes).
    - [ ] Implement `Angular Material` generator strategy (mapping to `mat-*` components).
- [ ] Task: specific Preview & Export UI
    - [ ] Implement "Code View" panel to display the generated string.
    - [ ] Add functionality to toggle between flavors and see the code update.
    - [ ] Implement "Export JSON" (save state) and "Download Code" buttons.
    - [ ] Write tests for the generation logic.
- [ ] Task: Conductor - User Manual Verification 'Multi-Flavor Code Generation & Export' (Protocol in workflow.md)
