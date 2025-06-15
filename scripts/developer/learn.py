import csv

from developer.classes.book import Book
from qtools import *

def print_title(title):
	qcli.message(f"Title: {title}", "star")

def ex001():
	print_title("EX001: basic class")
	book = Book("Sapiens")
	qcli.message(f"Title: {book.get_title()}", "success")


def ex002():
	print_title("EX002: f-string")
	filename = "text.txt"
	print(f"File is: {filename}")

def ex003():
	print_title("EX003: print contents of a text file")
	data = open("../scripts/developer/data/infos.txt", "r", encoding="utf-8")
	contents = data.read()
	qcli.message(f"Contents:\n{contents}", "success")

def ex004():
	print_title("EX004: prints contents of csv with 'with'")
	with open("../scripts/developer/data/flashcards.csv", "r", encoding="utf-8") as data:
		rows = csv.reader(data, delimiter=';')
		qcli.message("== Contents of rows:")
		for row in rows:
			qcli.message(f"Row1: {row}", "success")
		# reset the cursor and display again
		data.seek(0)
		rows = csv.reader(data, delimiter=';')
		qcli.message("== Topics:")
		for row in rows:
			qcli.message(f"Topic: {row[0]}", "success")