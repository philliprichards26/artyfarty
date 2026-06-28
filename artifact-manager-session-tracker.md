# Artifact Manager — Session Tracker

**If no artifacts were produced in this conversation — do nothing.**

If artifacts were produced, at session end generate the following without being asked:

1. Print the filename in a copyable code block:
   artifacts-delta-YYYY-MM-DD-topic.json
   (topic = 2–3 word slug describing what was built)

2. Generate the delta JSON as a downloadable file

3. Produce each text artifact as a separate downloadable file
   (.py, .html, .js, .ts, .jsx, .css, .sql, .md, .sh, .yaml, .json, .xml, .txt)
   Binary files (.pdf, .xlsx, .docx, .pptx, .zip) — note these must be saved manually from earlier in the chat

## Historical Mode
If this skill is triggered on an old conversation, immediately scan the full conversation history and generate the JSON and individual files — do not wait for further instruction.

## JSON Format
```json
{
  "exportedAt": "ISO timestamp",
  "exportType": "delta",
  "exportFilename": "artifacts-delta-YYYY-MM-DD-topic.json",
  "folders": [],
  "artifacts": [
    {
      "id": 7342,
      "name": "exact-filename.py",
      "desc": "One sentence describing what this does",
      "folder": null,
      "tags": ["relevant", "tags"],
      "starred": false,
      "createdAt": 1751050000000,
      "_updatedAt": 1751050000000,
      "versions": [
        {
          "v": "v1",
          "note": "What this version does",
          "preferred": false,
          "savedAt": 1751040000000
        },
        {
          "v": "v2",
          "note": "Final working version",
          "preferred": true,
          "savedAt": 1751050000000
        }
      ]
    }
  ]
}
```

## Rules
- Include EVERY file produced in the session
- Use the exact filename as the artifact name
- Mark the best/final version as "preferred": true
- Start artifact IDs from a random number between 5000–9999
- Set "folder": null — folders are assigned after importing
- Export type is always "delta"
