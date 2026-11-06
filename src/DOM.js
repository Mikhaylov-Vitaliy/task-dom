/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const el = document.createElement(tag);
        el.textContent = content;
        document.body.appendChild(el);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    function buildNode(curLevel) {
        if (curLevel > level) {
            return null;
        }
        const node = document.createElement('div');
        node.classList.add(`item_${curLevel}`);
        if (curLevel < level) {
            for (let i = 0; i < childrenCount; i++) {
                const child = buildNode(curLevel + 1);
                if (child) {
                    node.appendChild(child);
                }
            }
        }
        return node;
    }
    if (level <= 0) return null;

    return buildNode(1);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    const root = generateTree(2, 3);
    if (!root) return null;

    const temp = Array.from(root.querySelectorAll('.item_2'));

    temp.forEach((prevNode) => {
        const newNode = document.createElement('section');
        newNode.className = prevNode.className;
        while (prevNode.firstChild) {
            newNode.appendChild(prevNode.firstChild);
        }

        prevNode.replaceWith(newNode);
    });

    return root;
}
