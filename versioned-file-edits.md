# Versioned File Edits

Never overwrite a file that already exists. Always create a versioned copy before or instead of overwriting.

## Versioning Scheme

Append a version suffix to the base filename before the extension:

```
original:  phillip-artifact-manager.html
version 2: phillip-artifact-manager-v2.html
version 3: phillip-artifact-manager-v3.html
```

For files that already have a version number, increment it.
For files with no version, start at v2 (the original is v1).

## Workflow

1. Write the edited content to the NEXT version filename
2. Validate syntax before presenting:
   - HTML/JS: extract and parse the script block with node
   - Python: `python3 -c "import ast; ast.parse(open('f').read())"`
   - JSON: `python3 -c "import json; json.load(open('f'))"`
3. Keep only 2 versions: current + one rollback. Delete older ones.
4. Present the new file, state the version, what changed, and which version is available as rollback.

If validation fails: fix the issue before presenting.
Never present a file that has not been validated.
Never skip validation because the change was "small".
