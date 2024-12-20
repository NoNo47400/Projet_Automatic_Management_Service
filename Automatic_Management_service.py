import requests
from enum import Enum
import threading
import time

#
def handleResponse(r):
    print (r.status_code)
    print (r.headers)
    print (r.text)

# Create AE (Application Entity)
def createAE(origin, name, path):
    payload = {
        "m2m:ae": {
            "rn": name, 
            "api": "Norg", 
            "rr": True, 
            "srv": ["3"]
        }
    }
    _headers = {
        'X-M2M-Origin': origin,
        'X-M2M-RI': '123',
        'X-M2M-RVI': '3',
        'Content-Type': 'application/json;ty=2', # AE
    }
    r = requests.post(path,json=payload,headers=_headers)
    handleResponse(r)

# Delete AE (Application Entity)
def deleteAE(origin, name, path):
    _headers = {
        'X-M2M-Origin': origin,
        'X-M2M-RI': '123',
        'X-M2M-RVI': '3',
    }
    r = requests.delete(path + name,headers=_headers)
    handleResponse(r)

# Create CNT (Container)
def createCNT(origin, name, path):
    payload = {
        "m2m:cnt": {
            "rn": name, 
            "lbl": ["tag:location"]
        }
    }
    _headers = {
        'X-M2M-Origin': origin,
        'X-M2M-RI': '123',
        'X-M2M-RVI': '3',
        'Content-Type': 'application/json;ty=3', # container
    }
    r = requests.post(path,json=payload,headers=_headers)
    handleResponse(r)

# Create CIN (Content Instance)
def createCIN(origin, name, content, path):
    payload = {
        "m2m:cin": {
            "rn": name, 
            "lbl": ["tag:greeting"],
            "cnf": "text/plain:0",
            "con": content
        }
    }
    _headers = {
        'X-M2M-Origin': origin,
        'X-M2M-RI': '123',
        'X-M2M-RVI': '3',
        'Content-Type': 'application/json;ty=4', # contentInstance
    }
    r = requests.post(path, json=payload,headers=_headers)
    handleResponse(r)

def subscribe(origin, path):
    payload = {
        "m2m:sub": {
            "rn": "sub", 
            "nu": ["http://localhost:8080/notify"],
            "nct": 2
        }
    }
    _headers = {
        'X-M2M-Origin': origin,
        'X-M2M-RI': '123',
        'X-M2M-RVI': '3',
        'Content-Type': 'application/json;ty=23', # subscription
    }
    r = requests.post(path,json=payload,headers=_headers)
    handleResponse(r)

def setup_environment():
    createAE("Cmyself_INSA", "INSA", 'http://localhost:8080/cse-in') # create AE
    #Room1
    createCNT("Cmyself_INSA", "Room1", 'http://localhost:8080/cse-in/INSA') # create container
    createCIN("Cmyself_INSA", "Doors", "Created", 'http://localhost:8080/cse-in/INSA/Room1') # create contentInstance
    createCIN("Cmyself_INSA", "Windows", "Created", 'http://localhost:8080/cse-in/INSA/Room1') # create contentInstance
    createCIN("Cmyself_INSA", "Lights", "Created", 'http://localhost:8080/cse-in/INSA/Room1') # create contentInstance
    createCIN("Cmyself_INSA", "Presence_Sensor", "Created", 'http://localhost:8080/cse-in/INSA/Room1') # create contentInstance
    subscribe("Cmyself_INSA", 'http://localhost:8080/cse-in/INSA/presence') # create subscription
    #Room2
    createCNT("Cmyself_INSA", "Room2", 'http://localhost:8080/cse-in/INSA') # create container
    createCIN("Cmyself_INSA", "Doors", "Created", 'http://localhost:8080/cse-in/INSA/Room2') # create contentInstance
    createCIN("Cmyself_INSA", "Windows", "Created", 'http://localhost:8080/cse-in/INSA/Room2') # create contentInstance
    createCIN("Cmyself_INSA", "Lights", "Created", 'http://localhost:8080/cse-in/INSA/Room2') # create contentInstance
    createCIN("Cmyself_INSA", "Presence_Sensor", "Created", 'http://localhost:8080/cse-in/INSA/Room2') # create contentInstance
    

if __name__ == '__main__':
    #deleteAE("Cmyself_INSA", "INSA", 'http://localhost:8080/cse-in/') # delete AE
    setup_environment()