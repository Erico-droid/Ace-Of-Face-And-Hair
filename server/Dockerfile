FROM python:3.8-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies
# RUN apt-get update \
#     && apt-get install -y --no-install-recommends \
#         build-essential \
#         libpq-dev \
#     && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project files to the container
COPY . .

# Run migrations and collect static files (if needed)
# RUN python manage.py migrate
# RUN python manage.py collectstatic --noinput

# Set the entrypoint command (adjust as needed)
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
