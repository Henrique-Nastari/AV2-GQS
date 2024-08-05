import validateUserAndPassword from '../src/validateUserAndPassword';

describe('validateUserAndPassword', () => {
    test('deve validar um nome de usuário e senha válidos', () => {
        const result = validateUserAndPassword('newuser', 'Password123!');
        expect(result).toEqual({
            valid: true,
            message: "Usuário e senha válidos.",
            strength: "Forte"
        });
    });

    test('deve retornar erro para nome de usuário curto', () => {
        const result = validateUserAndPassword('user', 'Password123!');
        expect(result).toEqual({
            valid: false,
            message: "Nome de usuário deve ter pelo menos 5 caracteres."
        });
    });

    test('deve retornar erro para nome de usuário já existente', () => {
        const result = validateUserAndPassword('user1', 'Password123!');
        expect(result).toEqual({
            valid: false,
            message: "Nome de usuário já existe."
        });
    });

    test('deve retornar erro para senha curta', () => {
        const result = validateUserAndPassword('newuser2', 'Pass1!');
        expect(result).toEqual({
            valid: false,
            message: "Senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e caracteres especiais.",
            strength: "Muito Fraca"
        });
    });

    test('deve retornar erro para senha sem letras maiúsculas', () => {
        const result = validateUserAndPassword('newuser3', 'password123!');
        expect(result).toEqual({
            valid: false,
            message: "Senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e caracteres especiais.",
            strength: "Média"
        });
    });

    test('deve retornar erro para senha sem letras minúsculas', () => {
        const result = validateUserAndPassword('newuser4', 'PASSWORD123!');
        expect(result).toEqual({
            valid: false,
            message: "Senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e caracteres especiais.",
            strength: "Média"
        });
    });

    test('deve retornar erro para senha sem caracteres especiais', () => {
        const result = validateUserAndPassword('newuser5', 'Password123');
        expect(result).toEqual({
            valid: false,
            message: "Senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e caracteres especiais.",
            strength: "Média"
        });
    });
});
