<div id="editor">
  {% include "editor-toolbar" %}
  <div id="textarea">
    {% include "editor-content" %}
  </div>
</div>
<div id="source" style="display:none;">
    <textarea name="editor-source" rows="10"></textarea>
    <div class="editor-source-btns">
        <a href="#" class="cancel">Cancel</a>
        <a href="#" class="update">Update</a>
    </div>
</div>
