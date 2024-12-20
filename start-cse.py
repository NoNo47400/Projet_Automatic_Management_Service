# Increase the width of the notebook to accommodate the log output
from IPython.display import display, HTML

def increase_notebook_width():
    display(HTML("<style>.container { width:100% !important; }</style>"))

# Change to the CSE's directory and start the CSE
import os
import subprocess

def change_directory_and_start_cse():
    try:
        os.chdir('tools/ACME')
    except Exception as e:
        print(f"Error changing directory: {e}")

    try:
        subprocess.run(['python', '-m', 'acme', '--headless'], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error running acme: {e}")

if __name__ == "__main__":
    increase_notebook_width()
    change_directory_and_start_cse()