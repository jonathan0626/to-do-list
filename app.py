from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

tasks = []
next_id = 1

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks', methods=['GET', 'POST'])
def manage_tasks():
    global next_id
    if request.method == 'POST':
        data = request.get_json()
        task = {
            'id': next_id,
            'text': data['text'],
            'date': data['date'],
            'priority': data['priority'],
            'completed': False
        }
        tasks.append(task)
        next_id += 1
        return jsonify({'tasks': tasks})
    else:
        return jsonify({'tasks': tasks})

@app.route('/tasks/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def update_delete_task(id):
    global tasks
    if request.method == 'PUT':
        data = request.get_json()
        for task in tasks:
            if task['id'] == id:
                if 'completed' in data:
                    task['completed'] = not task['completed']
                else:
                    task['text'] = data['text']
                    task['date'] = data['date']
                    task['priority'] = data['priority']
                break
        return jsonify({'tasks': tasks})
    elif request.method == 'DELETE':
        tasks = [task for task in tasks if task['id'] != id]
        return jsonify({'tasks': tasks})
    elif request.method == 'GET':
        task = next((task for task in tasks if task['id'] == id), None)
        return jsonify({'task': task})

if __name__ == '__main__':
    app.run(debug=True)
