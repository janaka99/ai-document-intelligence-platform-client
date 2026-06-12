---

name: ui-styling
description: Use shadcn/ui components and styling conventions whenever possible.
--------------------------------------------------------------------------------

# ui-styling

When creating new pages, components, forms, dialogs, tables, or other UI elements, prefer using shadcn/ui components and patterns whenever possible.

## When to Use This Skill

Use this skill when:

* Creating a new page.
* Creating a new component.
* Adding new UI elements.
* Building forms, dialogs, tables, cards, dropdowns, or navigation components.
* Implementing layouts or styling.

## Guidelines

### Prefer shadcn/ui Components

Use existing shadcn/ui components before creating custom implementations.

Examples:

* Button
* Card
* Dialog
* Sheet
* Dropdown Menu
* Select
* Tabs
* Table
* Form
* Input
* Textarea
* Checkbox
* Radio Group
* Badge
* Tooltip
* Popover

### Styling

* Use Tailwind CSS utility classes.
* Follow shadcn/ui styling patterns and conventions.
* Avoid custom CSS files unless necessary.
* Avoid inline styles unless there is a specific requirement.
* Use design tokens and CSS variables provided by the project.

### Component Creation

Before creating a custom component:

1. Check if a shadcn/ui component already exists.
2. Extend or compose existing shadcn/ui components when possible.
3. Create custom components only when the required functionality cannot be achieved through composition.

### Forms

* Prefer shadcn/ui Form components.
* Use validation libraries already adopted by the project.
* Maintain consistent spacing, labels, and error states.

### Accessibility

* Preserve accessibility features provided by shadcn/ui.
* Ensure keyboard navigation works correctly.
* Use semantic HTML whenever possible.

## Summary

* Prefer shadcn/ui components whenever possible.
* Use Tailwind CSS for styling.
* Avoid custom implementations if an existing shadcn/ui component can solve the problem.
* Maintain consistent design patterns across the application.
