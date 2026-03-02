# Specification: Nested Card Container Layout

## Overview
Implement a robust state management and drag-and-drop engine that supports infinite nesting within Card Containers. This track formalizes the "Element > Row > Element" recursive structure, specifically focusing on ensuring that Card Containers can reliably host any other element type, including nested cards.

## Functional Requirements
- **Recursive State Tree:** Ensure the `FormElement` and `ElementRow` models support deep nesting via the `nestedRows` property.
- **Deep Drag & Drop:** Enable elements to be dropped from the toolbox or moved from other rows directly into a card's nested rows.
- **Hit-Test Prioritization:** Ensure nested drop zones take precedence over parent containers when overlapping.
- **Universal Movement:** Hardened `ElementService.moveElement` logic to find, remove, and insert elements anywhere in the deep tree.
- **Recursive Row Management:** Support adding and deleting rows at any level of nesting within a card.
- **Nested Card Support:** Allow cards to be nested within other cards (infinite nesting capability).

## Visual Requirements
- **Standard Highlighting:** Use the established dashed border highlight for all drop targets, including nested card rows.
- **Contextual Hover:** Correctly track and display hover states for nested zones to provide immediate feedback.

## Acceptance Criteria
- [ ] Dragging an element from the toolbox to a nested card row works correctly.
- [ ] Moving an existing element from a top-level row to a nested card row updates the state correctly.
- [ ] Dropping a card into another card's row is allowed and rendered correctly.
- [ ] Deleting a nested row correctly removes its children without affecting other branches of the tree.
- [ ] Hovering over a nested row correctly highlights it without flickering or parent interference.

## Out of Scope
- Multi-column grid layouts (column-based positioning).
- Conditional visibility logic for nested elements.