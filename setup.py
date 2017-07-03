from setuptools import setup, find_packages
import os
import divio_styleguide

CLASSIFIERS = [
    'Environment :: Web Environment',
    'Framework :: Django',
    'Intended Audience :: Developers',
    'License :: OSI Approved :: BSD License',
    'Operating System :: OS Independent',
    'Programming Language :: Python',
    'Topic :: Software Development :: Libraries :: Application Frameworks',
    'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
]

setup(
    author="Divio AG",
    author_email="developers@divio.ch",
    name='divio-styleguide',
    version=divio_styleguide.__version__,
    description='Divio style guide app',
    long_description=open(os.path.join(os.path.dirname(__file__), 'README.rst')).read(),
    url='http://www.divio.ch/',
    license='BSD License',
    platforms=['OS Independent'],
    classifiers=CLASSIFIERS,
    install_requires=[
        'Django>=1.7',
        'django-standard-form>=1.0.0,<1.2',
    ],
    packages=find_packages(exclude=[]),
    include_package_data=True,
    zip_safe=False,
)
