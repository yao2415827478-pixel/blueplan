import { build } from 'vite';
import { defineConfig } from 'vite';

const config = defineConfig({
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            input: 'src/main.js',
            output: {
                format: 'es'
            }
        }
    }
});

build(config);