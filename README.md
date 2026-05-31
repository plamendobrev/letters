# Letters (2021–2023)

Letters was an ambitious project aimed at creating a free platform where writers could write, publish, distribute, and even sell their books.

The idea was born shortly after I abandoned my previous project in early 2021. My first attempt was a conceptual Electron application that never progressed very far. By the end of 2021, however, I had completed much of the server-side infrastructure and began building what would become the actual Letters editor throughout 2022, when I was 17 years old.

## What This Repository Actually Contains

Before going any further, it is important to understand that this repository does not contain the original Letters experience.

What you see here is a quickly stripped-down version of the application, created for archival and portfolio purposes. Large portions of the original codebase have been removed, disconnected, or replaced. Many features no longer function properly, and some do not function at all.

Letters relied heavily on server-side infrastructure. The editor maintained a constant Socket.IO connection to synchronize author drafts, and many core features depended on APIs, databases, background services, and business logic that are not included in this repository.

As a result, this project should be viewed as a historical snapshot rather than a fully functional application.

## The Missing Backend

The original backend is intentionally not included.

While very little of the Node.js code that powered Letters remains relevant to my current projects, it is historically significant because several later projects were built on top of foundations that originated within the Letters backend.

For that reason, I have chosen not to publish it.

## A Lesson in What Not to Do

This project is another excellent example of how **not** to write code.

I built it when I was 17 years old, and the code quality does not reflect my current standards. The architecture is inconsistent, many decisions were made without long-term planning, and documentation is almost entirely nonexistent.

Not only did I write questionable code, but I also somehow convinced myself that writing virtually no comments was a good idea. It was not. If anyone ever decides to reconstruct the original application from this repository, they are in for a very interesting challenge.

## Why Letters Matters To Me

Despite its flaws, Letters holds a special place in my heart.

It was the first time I felt like I had built an actual ecosystem rather than a standalone application.

The project consisted of more than just the editor. Alongside it existed a dedicated marketplace called Books, where authors could instantly publish their work and even assign prices to it.

This was also the first project where I worked with payment systems and digital purchases, making it an important milestone in my growth as a developer.

Unfortunately, a combination of infrastructure costs, an increasingly unsustainable codebase, and personal challenges during 2023 eventually led me to shelve the project indefinitely.

## One Feature I'm Still Proud Of

Among all the questionable code, there is one feature that I remain genuinely proud of.

When authors saved their documents, the HTML content was carefully inspected and validated before being sent to the server. Beyond that, I built a system capable of splitting and tracking individual words while preserving complex formatting.

This made it possible to attach special effects directly to specific words within a book. Readers could click those words and trigger animations, sounds, and other interactive effects while reading.

The feature still exists in this archived build, so you can experiment with it and get a glimpse of what the original platform felt like.

## Credits & Third-Party Resources

Some of the visual effects and assets used in this project were created by other authors.

For example, the leaf animation effect was based on a tutorial by:

* https://www.youtube.com/watch?v=FAF6iy2eUyw

Many icons were obtained from Flaticon and other online resources. Unfortunately, because this project was never officially released and has been archived for several years, I no longer have complete records of all asset sources and creators.

If you are the creator of any resource included in this repository and would like attribution added, corrected, or the resource removed entirely, please open an issue and I will gladly address it.

## Final Notes

Letters was never completed, never released, and certainly never polished.

What remains here is a preserved snapshot of a teenager attempting to build a full publishing platform, complete with collaborative editing, marketplaces, digital sales, and interactive reading experiences.

The code is messy. The architecture is questionable. The comments are missing.

But the ambition was real.
