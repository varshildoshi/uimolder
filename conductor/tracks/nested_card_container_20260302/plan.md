# Implementation Plan: Nested Card Container Layout

## Phase 1: Core Recursive Architecture
- [x] Task: Harden Recursive Data Models
    - [x] Write failing tests for deep tree structure validation.
    - [x] Ensure `FormElement` and `ElementRow` models are correctly typed for `nestedRows`.
- [x] Task: Implement Robust Recursive Service Methods
    - [x] Write failing tests for `findDeep`, `removeDeep`, and `insertDeep`.
    - [x] Refactor `ElementService` to use these exhaustive recursive patterns for all state mutations.
- [ ] Task: Conductor - User Manual Verification 'Core Recursive Architecture' (Protocol in workflow.md)

## Phase 2: Advanced Drag-and-Drop Engine
- [ ] Task: Implement Priority Hit-Testing
    - [ ] Write failing tests for `allContainerIds` sorting (nested first).
    - [ ] Update `ElementService` to prioritize nested row IDs in the connected list.
- [ ] Task: Implement Parent Suppression & Rejection Logic
    - [ ] Write failing tests for `canDrop` predicates (card rejection and parent back-off).
    - [ ] Update `ElementEditor` and `CardContainer` with refined `canDrop` logic.
- [ ] Task: Conductor - User Manual Verification 'Advanced Drag-and-Drop Engine' (Protocol in workflow.md)

## Phase 3: Visual Feedback & UI Polish
- [ ] Task: Implement Z-Index & Isolation Fixes
    - [ ] Update `ElementEditor.scss` and `CardContainer.scss` for elevation during drag.
    - [ ] Ensure nested drop zones are physically reachable in the DOM.
- [ ] Task: Final Recursive Nesting Verification
    - [ ] Perform "Infinite Cards" test (nesting 3+ levels deep).
    - [ ] Verify state integrity and code generation for deeply nested structures.
- [ ] Task: Conductor - User Manual Verification 'Visual Feedback & UI Polish' (Protocol in workflow.md)