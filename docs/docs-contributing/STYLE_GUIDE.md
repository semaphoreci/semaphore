
# Style Guide

This document describe *guidelines* to write documentation pages. Documents are written in Markdown with a [few custom components](#components). 

## Linter

A few rules are enforced with markdownlint. Run the linter before pushing changes or creating a pull request:

```shell
npm run lint
```

The rules are explained in [markdownlint rule descriptions](https://github.com/DavidAnson/markdownlint/blob/v0.32.1/README.md#configuration). Fix any errors before pushing changes into the repo.

## Language

The general guidelines to approach writing are:

- Put first things first
- Write like you speak 
- Get to the point fast
- Shorter is better than longer
- Simple is better than complex
- Be bold

### General rules

- Grammar: before submitting a pull request, verify all non-code text with [Grammarly](https://grammarly.com) (use a free account)
- Prefer active over passive voice
- Prefer the present tense
- Contractions: use contractions: it's, you'll, you're, let's.
- Imperative: use imperative for steps, e.g. "Fork the repository and clone it to your machine"
- Punctuation: skip periods (.), exclamation (!) and question (?) marks in titles, headings and bullet point lists 
- Commas: when listing three or more items use a comma before the conjuction (Oxford comma), e.g. "apples, tomatoes, and pears"
- Italics: use *italics* to draw attention to words.
- Bold: use **bold** for UI elements.
- Ampersand (&): don't use ampersand instead of "and", e.g. "Jobs and Pipelines"
- Links: use meaningful text in the link text. The reader should know where the link goes before clicking on it, e.g. instead of "Read *this* to learn more" use "Read the *Jobs page* to learn more".
- Images: images should provide an Alt text. Don't leave images without alt text. The text should describe the contents of the page for persons using a screen reader.
- Jargon: don't overuse jargon. Use plain English whenever possible.
- Numbers: numbers lower than then must be spelled in words, e.g. "one, two, three". Number greater than 10 must be writen in numerals, e.g. "10, 25, 102"
- Links to missing pages: links to pages not yet written should be _enclosed inside underscores_ for easy identification

### Code

Use `inline fences` for inline code.

For blocks of code, use code fences with the language. Use `shell` for Bash or shell scripts. You can add `title="Filename"` next to the language when describing what file to edit:

```yaml title=".semaphore/semaphore.yml"
Example pipeline
```

### Capitalization

Titles are used in the left sidebar, so they must be properly capitalized. Headings are shown in the right-side TOC, only the first word must be capitalized.

- Titles: capitalize *only* the H1 titles using the Chicago Manual of Style. Use [Capitalize My Title](https://capitalizemytitle.com/style/Chicago/) to generate the correct form.
- Headings: for H2 and H3 only capitalize the first word in the heading, e.g. `## Pipeline settings`
- Proper names: capitalize proper names like persons, places, languages or frameworks, e.g. "React" "JavaScript"
- Words: when in doubt, don't capitalize, e.g. "internet"

## Headers

Use a single H1 header for the page title at the beginning of the document. The only thing that can appear before the H1 header title is the frontmatter.

For the rest of the document only use H2 and H3 headers. Don't use H4 or smaller headers at all.

All H2 and H3 headers should have an anchor, e.g. `## Pipeline settings {#settings}` so it's easy to link from other pages.

Header rules:

- Keep them short: ideally under 4-5 words
- Use H3s sparingly: reserve H3s to split long H2 sections
- Obvious headings are best: for example "How to create a job" is a great heading for step-by-step instructions

## Bullet points and lists

Since most of the bullet points and lists are used to give step-by-step instructions and show commands, you can skip the final period at the end of the line.

Example:
1. This line doesn't end with a period. It describes how to use `checkout`
2. Another item. Only use periods to separate sentences in the same line
3. Periods at the end of this line are optional.

## Shell commands

When showing the output of a command, prefix it with a dollar sign ($) to distinguish command from output:

```shell
$ uname -a
Darwin mac.local 23.5.0 Darwin Kernel Version 23.5.0
```

When the output is not shown, don't use the dollar sign ($):

```shell
npm run build
```

## Step-by-step instructions

Only use indentation when absolutely needed. Avoid it when possible. The typical example is when you want to add a child item inside a list without breaking the numbering.

```md
1. Step 1
2. Step 2
3. Step 3 has some child image
  ![Alt text](image.jpg)
4. Thanks to indentation the numbering did not get interrupted
```

When there are large items between steps that might interrupt the flow of the step-by-step instructions, you should hide them using [toggles](#toggles). For example if image.jpg is really big and takes the whole screen, the reader might lose the thread of the steps. In that case we can do something like this:

```md
1. Step 1
2. Step 2
3. Step 3 has some child image

  <details>
  <summary>Show me</summary>
  <div>
    ![Alt text](image.jpg)
  </div>
  </details>

4. Thanks to indentation the numbering did not get interrupted
```

Note that the step child items need to be indented to keep the numbering of the list intact.

## Admonitions

Admonitions are used to highlight important passages in the docs. The syntax to use them is:

```md
:::note

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::
```

There are five types of admonitions, in increasing levels of importance:
- note
- tip
- info
- warning
- danger

Don't use an admonition of higher leven when a lower level will do. Danger should be reserved for actions that can break things.

## Verbs for UI actions

Use the proper verb to act on elements:
- Buttons are *pressed*
- Links are *clicked* or *navigated to*
- Toggable sections are *expanded*, *maximized* or *minimized*
- Text is *typed* into inputs


## Custom components {#components}

We use some non-standard React components and Markdown extensions.

### Tabs {#tabs}

Use tabs to show multiple ways of achieving the same task. For example, in the [jobs page](http://localhost:3000/docs/using-semaphore/jobs) we use tabs to show how to configure jobs using the visual editor and the YAML. In the [tasks page](http://localhost:3000/docs/using-semaphore/tasks) we use tabs to show how to create a task using the UI and the CLI.

To use tabs, import them near the beginning of the document:

```js
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Then add the `<Tabs>` component. Each `<TabItem>` is a tab. Indenting is optional.

```js
<Tabs groupId="myGroupId">
  <TabItem value="option1" label="Label 1">
  Markdown explaining option 1
  </TabItem>
  <TabItem value="option2" label="Label 2">
  Markdown explaining option 1
  </TabItem>
</Tabs>
```

The `groupID` is optional. Tabs sharing a group id will switch together through the document.

### Plans {#plans}

We use a special admonition to mark features that are available only with specific plans.

First import the React component:

```js
import Available from '@site/src/components/Available';
```

Then use the admonition in the MDX.

```js
// Renders as: Available on Semaphore Cloud: All Plans
<Available  />
```

You can pass an array of plans instead.

```js
// Renders as: Available on Semaphore Cloud: Startup Scalup
<Available  plans={['Startup','Scaleup']}/>
```

### Toggable content {#toggles}

You can hide less important elements using a toggable content

```html
<details>
 <summary>You will see this line</summary>
 <div>This content is hidden until the reader toggles the content</div>
</details>
```

You can add regular markdown inside the `<div>`

### YouTube Embeds

Sometimes we want to include a YouTube video inside the documentation. We have a custom component for this:

```js
import VideoTutorial from '@site/src/components/VideoTutorial';

<VideoTutorial title="Video Title" src="Video-Embed-URL"/>
```

To get the embeddable URL:

1. Go to the YouTube video
2. Press the **Share** button
3. Select embed
4. Copy the SRC part of the code, e.g. "https://www.youtube.com/embed/xId2H2wlKx4?si=0IXKyNNUVVjDDvHz"
