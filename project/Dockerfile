# Use the official PHP-FPM image
FROM php:8.2-fpm

COPY php.ini /usr/local/etc/php/conf.d/custom.ini

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libwebp-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    curl \
    unzip \
    && docker-php-ext-configure gd --with-jpeg --with-freetype --with-webp \
    && docker-php-ext-install \
    gd \
    mysqli \
    pdo \
    pdo_mysql \
    mbstring \
    exif \
    xml \
    intl \
    bcmath \
    opcache

# Install Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy project files to the container
COPY . /var/www/html

# Set user dynamically based on local user
ARG USER_ID
ARG GROUP_ID

RUN groupadd -g $GROUP_ID lance && \
    useradd -l -u $USER_ID -g $GROUP_ID -m -s /bin/bash lance && \
    chown -R lance:lance /var/www/html

# Switch to new user
USER lance

# Expose port 9000 for PHP-FPM
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
