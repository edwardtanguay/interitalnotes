class Book:
    def __init__(self, title):
        self._title = title

    def set_title(self, title):
        self._title = title

    def get_title(self):
        return self._title
