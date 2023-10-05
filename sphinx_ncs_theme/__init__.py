import os


__version__ = "1.0.19"


def setup(app):
    app.add_html_theme(
        "sphinx_ncs_theme", os.path.dirname(os.path.abspath(__file__))
    )

    return {
        'parallel_read_safe': True,
        'parallel_write_safe': True
    }
