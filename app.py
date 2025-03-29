from flask import Flask, render_template, request, make_response, redirect, url_for, jsonify, abort
import uuid 
app = Flask(__name__)
app.config['SERVER_NAME'] = "9000-idx-code-compiler-1743227055562.cluster-qpa6grkipzc64wfjrbr3hsdma2.cloudworkstations.dev"
preview_codes = {}
@app.route("/")
def index():
    """Serves the main editor page."""
    return render_template("index.html")

@app.route("/generate_preview", methods=['POST'])
def generate_preview_link():
    """
    Generates a unique ID, stores the code associated with it,
    and returns the unique preview URL.
    """
    user_code = request.form.get('code')
    if user_code is None:
        return jsonify({"error": "No code provided"}), 400
    preview_id = uuid.uuid4().hex
    preview_codes[preview_id] = user_code
    preview_url = url_for('show_preview', preview_id=preview_id, _external=True)
    return jsonify({"preview_url": preview_url})

@app.route("/preview/<string:preview_id>", methods=['GET'])
def show_preview(preview_id):
    user_code = preview_codes.get(preview_id)

    if user_code is None:
        abort(404, description="Preview not found or has expired.")
    return render_template("preview_render.html", user_code=user_code)

@app.route("/preview", methods=['GET'])
def preview_base():
     return make_response((
            "<h2>Preview Endpoint</h2>"
            "<p>Access previews via unique URLs like /preview/<unique_id>.</p>"
            "<p>Use the 'New Tab' button in the editor interface to generate one.</p>"
        ), 200)

def main():
    app.run(port=int(os.environ.get('PORT', 80)))
if __name__ == "__main__":
    main()
