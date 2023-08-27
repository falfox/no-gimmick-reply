import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"

import { usePreferenceStore } from "~src/hooks/usePreferenceStore"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*"],
  run_at: "document_end"
}

function addCssToDocument(css: string): HTMLStyleElement {
  var style = document.createElement("style")
  style.innerHTML = css
  style.id = "no-gimmick-css"
  document.head.appendChild(style)

  return style
}

export const getRootContainer = () => {
  const div = document.createElement("div")
  document.body.classList.add("no-gimmick")
  div.id = "no-gimmick"
  div.classList.add("no-gimmick")
  return document.body.appendChild(div)
}

export default function IndexContent() {
  const [preferences] = usePreferenceStore()

  useEffect(() => {
    let selector = `[aria-label="Timeline: Conversation"] [data-testid="tweet"]:only-child`

    if (preferences.isVerified) {
      selector += `:has([data-testid="icon-verified"])`
    }

    if (preferences.hasNoText) {
      selector += `:not(:has([data-testid="tweetText"]))`
    }

    if (preferences.hasImage) {
      selector += `:has([data-testid="tweetPhoto"])`
    }

    if (preferences.minimumWords > 0) {
      selector += `:has([data-is-gimmick="true"])`
    }

    const hasAllRuleDisabled =
      !preferences.isVerified &&
      !preferences.hasNoText &&
      !preferences.hasImage &&
      preferences.minimumWords === 0

    let css: HTMLStyleElement | null = null

    if (!hasAllRuleDisabled) {
      css = addCssToDocument(`
        body.gimmick-preview ${selector} {
            border: 1px solid red;
        }

        body:not(.gimmick-preview) ${selector} {
            display: none;
        }
    `)
    }

    if (preferences.previewMode) {
      document.body.classList.add("gimmick-preview")
    } else {
      document.body.classList.remove("gimmick-preview")
    }

    return () => {
      css?.remove()
    }
  }, [preferences])

  useEffect(() => {
    function removeGimmick(node: HTMLElement) {
      const tweetText = node.querySelector(
        '[data-testid="tweetText"]'
      ) as HTMLElement | null

      if (tweetText) {
        const wordCount = tweetText.innerText.split(" ").length

        if (wordCount < preferences.minimumWords) {
          tweetText.dataset["isGimmick"] = "true"
        } else {
          delete tweetText.dataset["isGimmick"]
        }
      }
    }

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          for (const node of mutation.addedNodes) {
            if (
              node instanceof HTMLElement &&
              node.matches('[data-testid="cellInnerDiv"]')
            ) {
              removeGimmick(node)
            }
          }
        }
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })

    for (const node of document.querySelectorAll(
      '[data-testid="cellInnerDiv"] [data-testid="tweet"]'
    )) {
      removeGimmick(node as HTMLElement)
    }

    return () => {
      observer.disconnect()
    }
  }, [preferences.minimumWords])

  return (
    <div
      className="max-w-lg w-full"
      style={{
        width: "400px"
      }}>
      Remove Gimmick Spam settings
    </div>
  )
}
