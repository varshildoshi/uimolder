# Implementation Plan: Nested Card Container Layout

## Phase 1: Core Recursive Architecture [checkpoint: fd3d634]
- [x] Task: Harden Recursive Data Models
    - [x] Write failing tests for deep tree structure validation.
    - [x] Ensure `FormElement` and `ElementRow` models are correctly typed for `nestedRows`.
- [x] Task: Implement Robust Recursive Service Methods
    - [x] Write failing tests for `findDeep`, `removeDeep`, and `insertDeep`.
    - [x] Refactor `ElementService` to use these exhaustive recursive patterns for all state mutations.
- [x] Task: Conductor - User Manual Verification 'Core Recursive Architecture' (Protocol in workflow.md)

## Phase 2: Advanced Drag-and-Drop Engine [checkpoint: 44442b1]
- [x] Task: Implement Priority Hit-Testing
    - [x] Write failing tests for `allContainerIds` sorting (nested first).
    - [x] Update `ElementService` to prioritize nested row IDs in the connected list.
- [x] Task: Implement Parent Suppression & Rejection Logic
    - [x] Write failing tests for `canDrop` predicates (card rejection and parent back-off).
    - [x] Update `ElementEditor` and `CardContainer` with refined `canDrop` logic.
- [x] Task: Conductor - User Manual Verification 'Advanced Drag-and-Drop Engine' (Protocol in workflow.md)

## Phase 3: Visual Feedback & UI Polish [checkpoint: 759f4e6]
- [x] Task: Implement Z-Index & Isolation Fixes
    - [x] Update `ElementEditor.scss` and `CardContainer.scss` for elevation during drag.
    - [x] Ensure nested drop zones are physically reachable in the DOM.
- [x] Task: Final Recursive Nesting Verification
    - [x] Perform "Infinite Cards" test (nesting 3+ levels deep).
    - [x] Verify state integrity and code generation for deeply nested structures.
- [x] Task: Conductor - User Manual Verification 'Visual Feedback & UI Polish' (Protocol in workflow.md)

## Phase: Bug Fixes
- [x] Task: Fix async state update in `moveElement` 705ab20
- [x] Task: Fix issue where existing elements cannot be moved into card rows 8c4dbf2
- [x] Task: Fix issue where already dropped elements cannot be moved within or into card rows e2bbd05
- [x] Task: Fix issue where parent row captures drag over child and causes reordering jitter 2486e1b

## Phase: Review Fixes
- [x] Task: Synchronize View Transitions with state updates in ElementService d3eb0b0