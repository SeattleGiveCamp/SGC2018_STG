from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from flask_jsonpify import jsonify
from flask_cors import CORS

# Get ready for some ugly code and a poorly designed API and database. This worked for the quick demo we needed to
# for the hackathon. Will probably need to be rebuilt from scratch if you want a functional app

db_connect = create_engine('sqlite:///upgrade.db')

app = Flask(__name__)
# Allow CORS access for anyone who wants it
CORS(app)
api = Api(app)

class getTask(Resource):
    def get(self, taskID):
        #This line is the result of some miscommunication on our team, some parts of the app
        #try to access this resource with a url:5002/content=id which is probably actually a better way of passing
        #arguments to the resources but I haven't configured it to handle that, hence a super lazy solution where I just
        #filter out the 'content=' part
        taskID=taskID.replace('content=', '')
        print(taskID)
        conn=db_connect.connect()
        query=conn.execute("Select * from Tasks where taskId='%s';"% (taskID))
        print(query.keys())
        result=dict(zip(tuple(query.keys()), query.fetchone()))

        return jsonify(result)

class updatePoints(Resource):
    # Mark a task as complete for a person and update their points. Also checks if the completion of this task completes
    # the mission, and returns a flag if and only if that is so. Does  person has nothing if the person has already
    # completed the task
    def put(self, personID, taskID):
        # Completed is a flag that will return true the first time the user completes a mission, and false
        # otherwise. If you want to see if a specific user has completed a specific mission otherwise, check for
        # the mission Id in the user's completed missions field
        completed=False

        #A bit of an unpleasant way of accomplishing what I want, but it defaults to assuming you've already completed
        # the task and only changes it if you haven't
        descr="You've already completed this task; +0"
        conn=db_connect.connect()
        query = conn.execute("Select * from people where PersonID='%s'" %(personID))
        row =query.fetchone()
        if(taskID not in row['Completed_Tasks']):
            query=conn.execute("Select Points, MissionID from Tasks where taskID='%s'" %(taskID))
            row2=query.fetchone()
            points = row2['Points']
            conn.execute("UPDATE People SET points=points+%d, Completed_Tasks=Completed_Tasks || '%s' where personID='%s'" % (points, taskID+' ', personID))
            #Update descr to reflect the fact that they haven't yet completed the task
            descr="Congratulations, you've received +%d points!" %(points)
            #Select all tasks associated with the mission that this task is part of
            query=conn.execute("Select TaskId from tasks where MissionID='%s';"%(row2['MissionID']))

            # Once again an ugly solution to accomplish what I want, but I assume that the completion of this task
            # will complete the mission as well, and only change it if I find a task in the mission they haven't completed
            # yet
            completed=True
            for task in query:
                if(task['TaskID'] not in row['Completed_Tasks'].split(" ")+[taskID]):
                    completed=False
                    break

            if(completed):
                conn.execute("Update people Set CompletedMissions=CompletedMissions||'%s' where personID='%s'"%(row2['MissionID'], personID))

        return {'descr':descr, 'CompletedMission':completed}


class getPointsByPerson(Resource):
    #An incredibly insecure way to quickly view a users profile for debugging purposes
    def get(self, personID):
        conn=db_connect.connect()
        query = conn.execute("Select * from People where personID='%s';" %(personID))
        result = dict(zip(tuple(query.keys()), query.fetchone()))
        return jsonify(result)

class getTasks(Resource):
    # Get a list of all the tasks in the Tasks table
    def get(self):
        conn=db_connect.connect()
        query=conn.execute("Select * from Tasks")
        result = {"tasks": [dict(zip(tuple(query.keys()), i))  for i in query]}
        return jsonify(result)

class getMission(Resource):
    #Get a missions info by it's ID
    def get(self, missionID):
        missionID = missionID.replace('content=', '')
        print(missionID)
        conn=db_connect.connect()
        query=conn.execute("Select * from Missions where MissionID='%s';"% (missionID))
        print(query.keys())
        result=dict(zip(tuple(query.keys()), query.fetchone()))

        return jsonify(result)

class getMissions(Resource):
    #Get a list of all the missions in the Missions table
    def get(self):
        conn=db_connect.connect()
        query=conn.execute("Select * from Missions")
        result = {"missions": [dict(zip(tuple(query.keys()), i))  for i in query]}
        return jsonify(result)

class getTasksByMissionId(Resource):
    #Get a list of all the tasks associated with a mission ID
    def get(self, missionID):
        conn=db_connect.connect()
        query=conn.execute("Select * from Tasks where MissionID='%s'"%(missionID))
        result = {"tasks": [dict(zip(tuple(query.keys()), i)) for i in query]}
        return jsonify(result)


# Add the paths to access each resource
api.add_resource(getTask, '/getTask/<taskID>')
api.add_resource(getPointsByPerson, "/points/<personID>")
api.add_resource(getTasks, '/getTasks')
api.add_resource(getMissions, '/getMissions')
api.add_resource(getMission, '/getMission/<missionID>')
api.add_resource(updatePoints, '/add/<personID>/<taskID>')
api.add_resource(getTasksByMissionId, '/getTasks/<missionID>')


if __name__ == '__main__':
    app.run(port='5002')
