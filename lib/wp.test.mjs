import assert from "node:assert/strict"
import { test } from "node:test"
import { tocOf } from "./wp.ts"

test("table of contents links to safe, unique article headings", () => {
  const { content, headings } = tocOf(
    '<h2 id="unsafe" onclick="alert(1)"><strong>Intro &amp; more</strong></h2><h3>Intro &amp; more</h3><h2>Intro &amp; more-2</h2><script>alert(1)</script>'
  )

  assert.deepEqual(headings, [
    { id: "intro-more", title: "Intro & more", nested: false },
    { id: "intro-more-2", title: "Intro & more", nested: true },
    { id: "intro-more-2-2", title: "Intro & more-2", nested: false },
  ])
  assert.match(
    content,
    /<h2 id="intro-more"><strong>Intro &amp; more<\/strong><\/h2>/
  )
  assert.doesNotMatch(content, /onclick|id="unsafe"|<script/)
  assert.deepEqual(tocOf("<p>No headings</p>").headings, [])
})
