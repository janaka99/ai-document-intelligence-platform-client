# project-structure

## Description

Provides guidance for organizing pages, features, and components within the application.

## When to Use This Skill

Use this skill when:

* Creating a new page or feature.
* Creating a new component.

Do **not** use this skill when modifying an existing page or component.

## Guidelines

### Creating a New Page or Feature

* Create a new folder inside the `pages` directory.
* Place all files related to that page or feature within its folder.

Example:

```text
pages/
├── dashboard/
├── users/
└── settings/
```

### Creating a New Component

#### Page-Specific Component

If the component is only used by a single page, create it inside that page's `_components` folder.

Example:

```text
pages/
└── users/
    ├── page.tsx
    └── _components/
        ├── UserTable.tsx
        └── UserFilters.tsx
```

#### Shared Component

If the component is used by multiple pages or features, place it in the global `components` directory.

Example:

```text
components/
├── Button.tsx
├── DataTable.tsx
└── Modal.tsx
```

## Summary

* New page/feature → create a folder under `pages`.
* Component used by only one page → place in that page's `_components` folder.
* Component shared across multiple pages → place in the global `components` folder.
