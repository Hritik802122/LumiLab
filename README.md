# LumiLab: Interactive Optics Learning

LumiLab is a production-ready React web application designed as an interactive learning module for Class 10 Optics (Reflection & Refraction). It features SVG-based simulations, animations, and quizzes to make learning physics intuitive and engaging.

Built with React, Vite, TypeScript, Tailwind CSS v4, Framer Motion, and Zustand.

## Learning Goals

- Understand the Laws of Reflection and Refraction.
- Learn image formation by spherical mirrors (concave and convex).
- Learn image formation by spherical lenses (convex and concave).
- Apply the Mirror Formula and Lens Formula to solve numerical problems.
- Understand concepts like focal length, magnification, and the nature of images (real/virtual, inverted/upright).

## How to Run

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd lumi-lab
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Sign Convention Used

This simulation strictly follows the **New Cartesian Sign Convention**:

1.  The optical element (mirror/lens) is at the origin (0, 0).
2.  The principal axis is the x-axis.
3.  Light travels from left to right.
4.  **Object distance (u)** is always negative as the object is placed to the left of the optical element.
5.  **Focal length (f)**:
    -   *Positive (+)* for converging elements (Concave Mirror, Convex Lens).
    -   *Negative (-)* for diverging elements (Convex Mirror, Concave Lens).
6.  **Image distance (v)**:
    -   *Positive (+)* if the image is formed on the right (real for lens, virtual for mirror).
    -   *Negative (-)* if the image is formed on the left (virtual for lens, real for mirror).

### Formulas Implemented:

-   **Mirror Formula**: `1/v + 1/u = 1/f`
-   **Lens Formula**: `1/v - 1/u = 1/f`
-   **Magnification (m)**: `m = -v/u` for both.

## Accessibility Statement

LumiLab is designed to be accessible to all learners. Key features include:
- Full keyboard navigability for all interactive controls (sliders, toggles).
- ARIA labels and roles for screen reader compatibility.
- High-contrast mode for improved visibility.
- Information is conveyed through multiple means (e.g., color, shape, text, icons), not just color alone. Dashed lines indicate virtual rays/images.
- Logical tab order and focus management.

---
*This project was built as a demonstration of senior-level frontend engineering and instructional design.*