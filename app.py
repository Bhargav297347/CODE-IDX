from flask import Flask, render_template, request, make_response, redirect, url_for, jsonify, abort
import uuid 
import datetime
import time
import threading
import os

app = Flask(__name__)
app.config['SERVER_NAME'] = "9000-idx-code-compiler-1743227055562.cluster-qpa6grkipzc64wfjrbr3hsdma2.cloudworkstations.dev"

preview_codes ={}
EXPIRATION_TIME_MINUTES = 20
CLEANUP_INTERVAL_SECONDS = 60


@app.route("/")
def index():
    """Serves the main editor page."""
    return render_template("index.html")

def cleanup_expired_previews():
    while True:  
        now = datetime.datetime.now()
        expired_preview_ids = []
        for preview_id, (timestamp, code) in preview_codes.items():
            if now - timestamp > datetime.timedelta(minutes=EXPIRATION_TIME_MINUTES):
               expired_preview_ids.append(preview_id)
        for preview_id in expired_preview_ids:
            if preview_id in preview_codes:
               del preview_codes[preview_id]
               print(f"Deleted expired preview: {preview_id}")
        time.sleep(CLEANUP_INTERVAL_SECONDS)

@app.route("/generate_preview", methods=['POST'])
def generate_preview_link():
    user_code = request.form.get('code')
    if user_code is None:
        return jsonify({"error": "No code provided"}), 400
    preview_id = uuid.uuid4().hex
    timestamp = datetime.datetime.now()
    preview_codes[preview_id] = (timestamp, user_code)

    preview_url = url_for('show_preview', preview_id=preview_id, _external=True)
    return jsonify({"preview_url": preview_url})

@app.route("/preview/<string:preview_id>", methods=['GET'])
def show_preview(preview_id):
    """
    Retrieves and renders the HTML code associated with a specific preview ID.
    """
    preview_data = preview_codes.get(preview_id)

    if preview_data is None: 
        abort(404, description="Preview not found or has expired.")

    timestamp, user_code = preview_data
    return render_template("preview_render.html", user_code=user_code)


# Optional: Add a handler for the base /preview path if needed
@app.route("/preview", methods=['GET'])
def preview_base():
     return make_response((
            "<h2>Preview Endpoint</h2>"
            "<p>Access previews via unique URLs like /preview/<unique_id>.</p>"
            "<p>Use the 'New Tab' button in the editor interface to generate one.</p>"
        ), 200) # 200 OK is fine here

def main():
    cleanup_thread = threading.Thread(target=cleanup_expired_previews, daemon=True)
    cleanup_thread.start()
    app.run(port=int(os.environ.get('PORT', 80)))

if __name__ == "__main__":
    main()
