---
author: rmexdev
pubDatetime: 2026-06-08T20:29:09.000+05:30
modDatetime: 2026-06-09T14:44:53.000+05:30
title: 'What I achieved in My First Week as a Self Employed Dev'
slug: 'what-i-achieved-in-my-first-week-as-a-self-employed-dev'
featured: false
draft: false
tags: [ weekly-update, indiehacker, webdev, career ]
description: 'What I did to setup a new domain, blog and social accounts all within a week, and my decisions and learnings along the way.'
canonical_url: https://www.rmex.dev/posts/what-i-achieved-in-my-first-week-as-a-self-employed-dev
---


Disclaimer: **NOT** AI generated.

Almost a week ago, I resigned from my Full time Software Developer Job to pursue Self Employment. This decision came after a lot of introspection on my part and I have covered the WHYs and the WHATs in detail in [Resigned from my Tech Job](https://rmex.dev/posts/resigned-from-my-tech-job-the-past-the-present-and-the-future/) post.

In this post, I plan to share my learnings and document the technical decisions along my journey towards Self Employment, so they can be used for future reference, by me and others.

## Table of contents

## Day 1: A New User and Email

I had already decided in advance to name my new online identity as `armex`. So, I named my new User and Email the same. Not a good decision, refer to Day 2.

### A new Desktop User

I started with creating a new Desktop User Account in my Linux Mint XFCE system. I did copy the config of my Personal Account to have the same themes and settings.

### A new Email

For the email provider, I went with ProtonMail. It's the only popular provider that is privacy focused and a non-profit.

### Day 1: Tech Stack and Decisions

- ProtonMail: To avoid Big Tech and their predatory practices.

## Day 2: Purchasing a Domain (and Change of Plans)

My plan was to buy `armex.dev` and `armex.tech` domain. `.dev` for my personal website and `.tech` for a non-profit which will own the Software Products I wish to create in the future. Unfortunately, `armex.tech` was not available, so I had to look for another domain name.
That proved to be rather simple as `rmex` was available with both the extensions. I bought my domains from Godaddy. I would go with Cloudflare from the next time.

Consequently, I had to then recreate the new User and Email I had created on Day 1.

I also created an account on Cloudflare for [Email Routing](https://www.cloudflare.com/products/email-routing/) which would route any email sent to `<any>@rmex.dev` to my Proton Mail. Plan was to use the domain email to create accounts on other Websites. Cancelled this as losing access to my domain (through any malicious means) would mean losing all other accounts as well. Not doing the email routing also keeps things simple.

Still kept the Cloudflare account for DNS, Stats, and as a backup Domain Name Provider.

### Day 2: Learnings

- Check if the domain is available first, lol.

### Day 2: Tech Stack and Decisions

- Cloudflare: Created for Email Routing, but cancelled for security reasons. Kept the account for backup.

## Day 3: Social Accounts and Blog Setup

### Social Accounts

These are the Social Sites I chose, along with the rationale:

- **YouTube**: I plan to create some videos eventually and it's hard to avoid YouTube despite being Big Tech.
- **Github**: Mostly for the free Static Website hosting that comes with Github Pages. I do plan to move to Codeberg eventually for my Software Products.
- **Dev.to**: Inline with the kind of posts and articles I wish to share.
- **Medium**: The biggest blogging platform and Highly ranked in SEO rankings.
- **X**: One of the hardest decisions, given their stance on multiple topics, but went along with it due to the Tech exposure one gets there. Eventually plan to leave this too.
- **Reddit**: The close-knitted communities on reddit are a great way to interact with domain experts and users.
- **Hacker News**: Good forum to receive extensive feedback for any of my products that I share.

I avoided Instagram and Facebook as I want to avoid any Meta products, and doing so is rather simple. Wish to keep the same stance going forward.

### Blog Setup

I had planned to deploy my Blog as a static site on Github Pages. When reading through the Github Pages documentation, Jekyll was the recommended Static site generator. I went through some of the themes and was sure that this was the way forward.

Although, the catch here was that Jekyll was not from the Typescript Ecosystem. This was a problem, as I wanted a Typescript monorepo setup for my Blog and the products I create so it would be easier to share packages and configs between the projects.

I simply searched for a `Typescript Static Site Generator` and [Astro](https://astro.build/)'s name came up. I was already familiar with the name, just not what it does, so it was an easy choice. After going through the themes available with Astro, I chose the [Astro Paper](https://astro.build/themes/details/astropaper/) theme.

The code for my blog is available on [Github](https://github.com/rmexdev/rmexdev.github.io).

### Day 3 Learnings

- Try looking for packages in the language ecosystem you are already familiar with to make things easier for yourself.

### Day 3 Tech Stack and Decisions

- [Astro](https://astro.build/) (over Jekyll): Known Typescript ecosystem and SEO support
- [Astro Paper](https://astro.build/themes/details/astropaper/) Theme: Free and Open Source, Sensible defaults, Great color scheme, Static Search functionality.

## Day 4: More Blog Setup

This was Day 2 of my Blog setup in Astro. I ran into issues, some of which were there in the boilerplate itself. After some debugging, had to change my package manager to `npm` and the `vite` package version to 7 which resolved the errors.

Will share a separate Technical Post sharing the steps of setting up a Astro Blog from scratch and connecting it to your domain.

## Day 5: Domain connection and Even more Blog changes

This section would also be covered in the Astro Blog post. Including the summaries for now:

### Config changes

Now it was time to make the Astro Paper theme my own. This involved updating the Astro Paper and Astro config, adding favicon and open graph images and changing theme colors according to my taste.

### Domain connection

The initial setup resulted in only the HTML being rendered on the page. The JS and CSS blobs were not getting loaded correctly.

The solution involved several trial and errors and some prompts to make it work. The issue was with the Base URL property in the Astro config. Adding the correct Base URL resolved the issue.

## Day 6 and 7: Writing is Hard

Now it was finally time to write. I had planned to post 2 blogs in one day itself. Suffice to say, I overestimated my ability to write posts by a lot. Actually, more like underestimating the time and effort it takes to write a single blog post.

Writing was hard! I sat down to write the Resignation Blog Post (My first Blog post ever), and my thoughts were running faster than I could write. Sat down to write one sentence and my mind was already planning things to do after Publishing.

I somehow got hold of myself, brainstormed on the points I wanted to include in the post and got it done after much self control. Instead of 2 posts in one day, I published 1 post in two days. Lol.

I now have a new found respect for all kinds of writers out there.

### Publishing

It's done! My first post was finally ready to publish. I was elated!

One of the doubts I had was whether posting the same blog post on multiple platforms would count as content duplication by SEO engines and affect my blog rankings. After reading through some articles, I encountered [Canonical URL](https://www.semrush.com/blog/canonical-url-guide/)s, made for this exact same purpose. When publishing to other platforms, just add the Canonical URL, i.e. the URL of the post on your blog, along with the post. This sends the web crawler to the Source URL instead of scraping the content on other platforms. Fortunately, Dev.to and Medium already supported this.

I did not focus on any strategies to increase success rate of my posts, as the emphasis on getting my first post published.

At this point in time, the post has received 13 upvotes on Reddit, 1 clap on Medium and 1 Bookmark on Dev.to. Less than what I had dreamt of, but much more than I expected.

### Day 7 Learnings

- Canonical URLs: Should be added with the post when adding your posts on other platforms.

## Conclusion

So, I ended up achieving the following in my first week as a Self Employed Dev:

- Custom domain connected with Cloudflare
- A blog published under the said domain
- Social accounts created with the username I needed
- **A Published Post with more than expected responses**

## Tools and Technologies Included

- Proton Mail
- Cloudflare
- Social Sites: List already mentioned above
- Jekyll
- Astro
- Astro Paper
- Github Pages

## Links Included

- [Resignation Blog Post](https://rmex.dev/posts/resigned-from-my-tech-job-the-past-the-present-and-the-future/)
- [Cloudflare Email Routing](https://www.cloudflare.com/products/email-routing/)
- [Astro](https://astro.build/)
- [Astro Paper Theme](https://astro.build/themes/details/astropaper/)
- [Canonical URLs](https://www.semrush.com/blog/canonical-url-guide/)
- [My Blog's Github Repository](https://https://github.com/rmexdev/rmexdev.github.io)
