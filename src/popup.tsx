import { useState } from "react"

import "~/src/style.css"

import { usePreferenceStore } from "~src/hooks/usePreferenceStore"

import { Toggle } from "./components/toggle"

function IndexPopup() {
  const [preferences, update] = usePreferenceStore()

  return (
    <div
      className="max-w-lg w-full p-8"
      style={{
        width: "400px"
      }}>
      <h1 className="text-xl font-bold">Settings</h1>

      <div className="gap-y-6 grid py-4">
        <div className="text-gray-600 text-base">
          Hide reply from tweet with these criterias:
        </div>
        <div className="flex justify-between items-center space-x-4">
          <div>
            <label className="font-medium text-base">Is Verified User</label>
            <p className="text-gray-600">Will hide reply from verified user</p>
          </div>
          <Toggle
            active={preferences.isVerified}
            onChange={() => {
              update({ isVerified: !preferences.isVerified })
            }}
          />
        </div>
        <div className="flex justify-between items-center space-x-4">
          <div>
            <label className="font-medium text-base">Has Image</label>
            <p className="text-gray-600">Will hide reply with image</p>
          </div>
          <Toggle
            active={preferences.hasImage}
            onChange={() => {
              update({ hasImage: !preferences.hasImage })
            }}
          />
        </div>
        <div className="flex justify-between items-center space-x-4">
          <div>
            <label className="font-medium text-base">Has no text</label>
            <p className="text-gray-600">Will hide reply with no text</p>
          </div>
          <Toggle
            active={preferences.hasNoText}
            onChange={() => {
              update({ hasNoText: !preferences.hasNoText })
            }}
          />
        </div>
        <div className="flex justify-between items-center space-x-4">
          <div>
            <label className="font-medium text-base">Minimum words</label>
            <p className="text-gray-600">
              Will hide reply with less than this amount of words
            </p>
          </div>
          <input
            type="number"
            min={0}
            className="border border-gray-300 rounded-md w-16 h-10 text-right pr-2"
            value={preferences.minimumWords}
            onChange={(e) => {
              update({ minimumWords: parseInt(e.target.value) })
            }}
          />
        </div>

        <div className="border-b border-gray-900 border-opacity-5" />

        <div className="flex justify-between items-center space-x-4">
          <div>
            <label className="font-medium text-base">Preview Mode</label>
            <p className="text-gray-600">
              Will highlight the tweet that will be hidden instead of hiding it
            </p>
          </div>
          <Toggle
            active={preferences.previewMode}
            onChange={() => {
              update({ previewMode: !preferences.previewMode })
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default IndexPopup
