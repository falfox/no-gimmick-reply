import { useStorage } from "@plasmohq/storage/hook"

interface PreferenceStore {
  isVerified: boolean
  hasImage: boolean
  hasNoText: boolean
  minimumWords: number
  previewMode: boolean
}

export const usePreferenceStore = (): [
  PreferenceStore,
  (PreferenceStore) => void
] => {
  const [preference, setPreference] = useStorage("preferences", {
    isVerified: false,
    hasImage: false,
    hasNoText: false,
    minimumWords: 0,
    previewMode: false,
  })

  function updatePreference(newPreference: PreferenceStore) {
    setPreference({ ...preference, ...newPreference })
  }

  return [preference, updatePreference]
}
