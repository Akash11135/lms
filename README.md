This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

//animation classes user by framer motion

Awesome! To have the review section animate every time you scroll up and then down (i.e., every time it enters the viewport), you need to:

Use whileInView without the once: true option.

Optionally, you can use exit animations or key remount tricks, but with Framer Motion, removing once: true lets the animation replay whenever it comes into view.

Update for the review and continue surfing animation to trigger every time in viewport:
Change:

tsx
Copy
Edit
viewport={{ once: true, amount: 0.3 }}
to

tsx
Copy
Edit
viewport={{ once: false, amount: 0.3 }}
for both the review section and the continue surfing section wrappers that have motion.div.

Classes & Variants you can reuse

1. Animation Variants
   tsx
   Copy
   Edit
   const fadeSlideUp = {
   hidden: { opacity: 0, y: 40 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
   };

const fadeSlideInFromRight = {
hidden: { opacity: 0, x: 40 },
visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeInStaggerChildren = {
hidden: { opacity: 0 },
visible: {
opacity: 1,
transition: { staggerChildren: 0.15 },
},
}; 2. Reusable CSS classes for animated containers
Purpose Example Classes Notes
Wrapper container w-full md:w-[90%] flex flex-col gap-4 Standard page width container
Image container w-full md:w-[60%] p-4 flex flex-wrap gap-1 justify-center rounded-sm Used to hold images
Product info w-full md:w-[40%] p-4 flex flex-col Product details section
Review container bg-white rounded-md mt-8 p-4 shadow-sm Container with white bg & shadow
Buttons container flex flex-wrap gap-3 Holds buttons side by side

You can apply these same class patterns on other pages to get consistent spacing and layout.

How to reuse this for other sections/pages
Wrap the container you want to animate in:

tsx
Copy
Edit
<motion.div
initial="hidden"
whileInView="visible"
viewport={{ once: false, amount: 0.3 }}
variants={fadeSlideUp}

> {/_ Your content _/}
> </motion.div>
> Use the animation variants for different effects (fadeSlideUp, fadeSlideInFromRight, etc.).

Use consistent CSS utility classes to maintain uniform layout.

Example for "Continue Surfing" section animation every scroll
tsx
Copy
Edit
<motion.div
initial="hidden"
whileInView="visible"
viewport={{ once: false, amount: 0.3 }}
variants={fadeSlideUp}
className="mt-5"

>

  <h1 className="text-xl font-bold">CONTINUE SURFING</h1>
  <div className="flex flex-wrap gap-4 mt-4">
    {/* Product cards */}
  </div>
</motion.div>
If you want, I can prepare a small reusable component or hook for you that applies these animations with minimal setup. Would that be helpful?
