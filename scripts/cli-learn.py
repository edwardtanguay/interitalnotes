import sys

from developer import learn
from qtools import *

def main():
	if len(sys.argv) > 1:
		exercise_number = sys.argv[1]
		try:
			getattr(learn, f'ex{exercise_number}')()
		except AttributeError:
			qcli.message(f'Exercise "{exercise_number}" does not exist:', 'error')
			display_npm_messages()
	else:
			qcli.message(f'Supply an exercise number:', 'error')
			display_npm_messages()

def display_npm_messages():
	qcli.message(f'npm run <exerciseNumber>', 'info')
	qcli.message(f'npm run 001', 'info')

main()